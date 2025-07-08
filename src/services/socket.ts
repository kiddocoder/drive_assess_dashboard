import { io, type Socket } from "socket.io-client"
import { BACKEND_URL } from "../config/app"

// interface SocketAuth {
//     userId?: string
//     userRole?: string
// }

export default class SocketService {
    private static instance: SocketService
    private socket: Socket | null = null
    private connected: boolean = false
    private reconnectAttempts: number = 0
    private maxReconnectAttempts: number = 5
    private eventCallbacks: Map<string, (...args: any[]) => void> = new Map()

    private constructor() {

    }

    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService()
        }
        return SocketService.instance
    }

    public connect(token: string): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.connected && this.socket) {
                resolve()
                return
            }

            this.socket = io(BACKEND_URL, {
                auth: { token },
                transports: ["websocket"],
                reconnectionAttempts: this.maxReconnectAttempts,
                reconnectionDelay: 1000,
                withCredentials: true,
            })

            this.socket.on("connect", () => {
                this.connected = true
                this.reconnectAttempts = 0
               // console.info("🔌 Connected to Socket.IO server")
                resolve()
            })

            this.socket.on("connect_error", (error) => {
                console.error("Socket connection error:", error)
                if (this.reconnectAttempts >= this.maxReconnectAttempts) {
                    reject(new Error("Failed to connect to Socket.IO server"))
                }
                this.reconnectAttempts++
            })

            this.socket.on("disconnect", (reason) => {
                this.connected = false
                console.info(`Disconnected from Socket.IO server: ${reason}`)
            })

            // Register all stored event callbacks
            this.eventCallbacks.forEach((callback, event) => {
                this.socket?.on(event, callback)
            })
        })
    }

    public disconnect(): void {
        if (this.socket) {
            this.socket.disconnect()
            this.socket = null
            this.connected = false
            console.info("🔌 Disconnected from Socket.IO server")
        }
    }

    public on(event: string, callback: (...args: any[]) => void): void {
        this.eventCallbacks.set(event, callback)
        if (this.socket) {
            this.socket.on(event, callback)
        }
    }

    public off(event: string): void {
        this.eventCallbacks.delete(event)
        if (this.socket) {
            this.socket.off(event)
        }
    }

    // Specific event handlers
    public onDashboardUpdate(callback: (data: any) => void): void {
        this.on("dashboard:update", callback)
    }

    public onTestStarted(callback: (data: {
        testId: string
        studentId: string
        testData: any
        timestamp: Date
    }) => void): void {
        this.on("test:started", callback)
    }

    public onTestCompleted(callback: (data: {
        testId: string
        studentId: string
        results: any
        timestamp: Date
    }) => void): void {
        this.on("test:completed", callback)
    }

    public onNotification(callback: (notification: {
        id: string
        message: string
        type: string
        timestamp: Date
    }) => void): void {
        this.on("notification:new", callback)
    }

    public onUserStatus(callback: (data: {
        userId: string
        status: "online" | "offline"
        timestamp: Date
    }) => void): void {
        this.on("user:status", callback)
    }

    public onSystemAlert(callback: (alert: {
        level: "info" | "warning" | "error"
        message: string
        timestamp: Date
    }) => void): void {
        this.on("system:alert", callback)
    }

    public onPaymentUpdate(callback: (data: {
        status: string
        amount?: number
        timestamp: Date
    }) => void): void {
        this.on("payment:update", callback)
    }

    // Client actions
    public subscribeToDashboard(): void {
        this.socket?.emit("dashboard:subscribe")
        console.info("📊 Subscribed to dashboard updates")
    }

    public joinTestSession(testId: string): void {
        this.socket?.emit("test:join", testId)
        console.info(`📝 Joined test session: ${testId}`)
    }

    public leaveTestSession(testId: string): void {
        this.socket?.emit("test:leave", testId)
        console.info(`📝 Left test session: ${testId}`)
    }

    public updateTestProgress(data: {
        testId: string
        progress: number
        currentQuestion: number
    }): void {
        this.socket?.emit("test:progress", data)
    }

    public markNotificationAsRead(notificationId: string): void {
        this.socket?.emit("notification:read", notificationId)
        console.info(`📬 Marked notification as read: ${notificationId}`)
    }

    public isConnected(): boolean {
        return this.connected
    }
}