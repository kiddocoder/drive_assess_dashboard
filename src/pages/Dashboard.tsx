"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import jsVectorMap from 'jsvectormap'
import 'jsvectormap/dist/jsvectormap.min.css'
import 'jsvectormap/dist/maps/world.js'

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Users,
  DollarSign,
  Award,
  AlertCircle,
  ArrowUp,
  ArrowDown,
  MapPin,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  Filter,
  Search,
  Car,
  BookOpen,
  Target,
  Zap,
  BarChart2,
  LineChartIcon,
  AreaChartIcon,
  InfoIcon as AnalyticsIcon,
} from "lucide-react"
import { API } from "../config/axios"


interface Marker {
  name: string;
  coords: number[];
}

const Dashboard = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("7d")
  const [activeChart, setActiveChart] = useState<"area" | "bar" | "line">("area")
  const [activeMetric, setActiveMetric] = useState<"revenue" | "users" | "tests">("revenue")
  const [selectedProvince, setSelectedProvince] = useState("ON")

  const mapRef = useRef<any>(null);
  const mapInstance = useRef<any>(null);
  const [markers] = useState<Marker[]>([
    { name: 'New York', coords: [40.7128, -74.0060] },
    { name: 'London', coords: [51.5074, -0.1278] },
  ]);

  useEffect(() => {
    const fetchDash = async () => {
      const res = await API.get("/dashboard/stats");
      return res.data;
    }
    fetchDash();
  }, [])

  // Initial map setup
  useEffect(() => {

    if (!mapRef.current) return;

    mapInstance.current = new jsVectorMap({
      selector: '#map',
      map: 'world',
      zoomButtons: true,
      markers: markers,
      regionStyle: {
        initial: {
          fill: '#e4e4e4',
        },
        hover: {
          fill: '#a0d1fb',
        },
      },
    });

    return () => {
      mapInstance.current && mapInstance.current.destroy();
    };
  }, []);


  // Update markers on the map when state changes
  useEffect(() => {
    if (mapInstance.current) {
      mapInstance.current.removeMarkers();
      mapInstance.current.addMarkers(markers);
    }
  }, [markers]);


  const worldData = {
    regions: [
      {
        name: "Canada",
        code: "CA",
        users: 45123,
        quizzes: 89456,
        revenue: 38920,
        growth: 12.5,
        flag: "🇨🇦",
        provinces: [
          { name: "Ontario", users: 18456, growth: 15.2 },
          { name: "Quebec", users: 12890, growth: 8.7 },
          { name: "British Columbia", users: 8934, growth: 18.3 },
          { name: "Alberta", users: 4843, growth: 11.2 },
        ],
      },
      {
        name: "United States",
        code: "US",
        users: 3245,
        quizzes: 5678,
        revenue: 4560,
        growth: 8.3,
        flag: "🇺🇸",
        provinces: [],
      },
      {
        name: "United Kingdom",
        code: "GB",
        users: 1567,
        quizzes: 2890,
        revenue: 2340,
        growth: 15.7,
        flag: "🇬🇧",
        provinces: [],
      },
      {
        name: "Australia",
        code: "AU",
        users: 892,
        quizzes: 1456,
        revenue: 1120,
        growth: 22.1,
        flag: "🇦🇺",
        provinces: [],
      },
      {
        name: "Germany",
        code: "DE",
        users: 567,
        quizzes: 890,
        revenue: 780,
        growth: 6.8,
        flag: "🇩🇪",
        provinces: [],
      },
    ],
    liveActivity: [
      { location: "Toronto, ON", action: "Quiz completed", time: "2 min ago", flag: "🇨🇦" },
      { location: "Vancouver, BC", action: "New user signup", time: "5 min ago", flag: "🇨🇦" },
      { location: "Montreal, QC", action: "Premium purchase", time: "8 min ago", flag: "🇨🇦" },
      { location: "London, UK", action: "Quiz completed", time: "12 min ago", flag: "🇬🇧" },
      { location: "Sydney, AU", action: "New user signup", time: "15 min ago", flag: "🇦🇺" },
    ],
  }

  // Canadian color theme
  const COLORS = {
    canadianRed: "#FF0000",
    white: "#FFFFFF",
    coolBlue: "#0066CC",
    successGreen: "#00AA00",
    charcoal: "#2C2C2C",
    grayText: "#666666",
    lightGray: "#F5F5F5",
    borderGray: "#E0E0E0",
  }

  const demographicColors = [COLORS.canadianRed, COLORS.coolBlue, COLORS.successGreen, "#FFBB28"]

  const stats = [
    {
      title: "Total Test Takers",
      value: "8,247",
      change: "+18.5%",
      changeType: "positive" as const,
      icon: Users,
      color: COLORS.coolBlue,
      chartData: [45, 52, 48, 61, 59, 72, 65],
    },
    {
      title: "Revenue (CAD)",
      value: "$94,580",
      change: "+32.8%",
      changeType: "positive" as const,
      icon: DollarSign,
      color: COLORS.canadianRed,
      chartData: [50, 45, 58, 62, 68, 75, 82],
    },
    {
      title: "Tests Completed",
      value: "12,834",
      change: "+24.2%",
      changeType: "positive" as const,
      icon: CheckCircle,
      color: COLORS.successGreen,
      chartData: [30, 35, 42, 38, 45, 52, 64],
    },
    {
      title: "Average Pass Rate",
      value: "87.3%",
      change: "+3.1%",
      changeType: "positive" as const,
      icon: Award,
      color: COLORS.charcoal,
      progressValue: 87.3,
    },
  ]

  const topQuizzes = [
    { name: "Road Signs Basic", completions: 2456, passRate: 94.5 },
    { name: "Traffic Rules Advanced", completions: 1890, passRate: 87.2 },
    { name: "Parking & Positioning", completions: 1567, passRate: 91.8 },
    { name: "Emergency Procedures", completions: 1234, passRate: 96.1 },
  ]

  const testCategories = [
    {
      name: "G1 Knowledge Test",
      totalTests: 4234,
      passRate: 89.2,
      avgScore: 85.4,
      color: COLORS.coolBlue,
      icon: BookOpen,
    },
    {
      name: "G2 Road Test",
      totalTests: 3156,
      passRate: 76.8,
      avgScore: 78.3,
      color: COLORS.successGreen,
      icon: Car,
    },
    {
      name: "Defensive Driving",
      totalTests: 2847,
      passRate: 92.1,
      avgScore: 88.7,
      color: COLORS.canadianRed,
      icon: Target,
    },
    {
      name: "Motorcycle Test",
      totalTests: 1286,
      passRate: 83.4,
      avgScore: 81.2,
      color: COLORS.charcoal,
      icon: Zap,
    },
  ]

  const recentTests = [
    {
      id: 1,
      testTaker: "Sarah Johnson",
      testType: "G1 Knowledge",
      score: 92,
      status: "passed",
      duration: "28 min",
      timestamp: "2 minutes ago",
      location: "Toronto, ON",
      lat: 43.6532,
      lng: -79.3832,
    },
    {
      id: 2,
      testTaker: "Michael Chen",
      testType: "G2 Road Test",
      score: 68,
      status: "failed",
      duration: "45 min",
      timestamp: "8 minutes ago",
      location: "Vancouver, BC",
      lat: 49.2827,
      lng: -123.1207,
    },
    {
      id: 3,
      testTaker: "Emma Wilson",
      testType: "Defensive Driving",
      score: 95,
      status: "passed",
      duration: "32 min",
      timestamp: "15 minutes ago",
      location: "Calgary, AB",
      lat: 51.0447,
      lng: -114.0719,
    },
    {
      id: 4,
      testTaker: "David Brown",
      testType: "Motorcycle Test",
      score: 78,
      status: "passed",
      duration: "38 min",
      timestamp: "22 minutes ago",
      location: "Montreal, QC",
      lat: 45.5017,
      lng: -73.5673,
    },
    {
      id: 5,
      testTaker: "Lisa Martinez",
      testType: "G1 Knowledge",
      score: 85,
      status: "passed",
      duration: "25 min",
      timestamp: "35 minutes ago",
      location: "Ottawa, ON",
      lat: 45.4215,
      lng: -75.6972,
    },
  ]

  const chartData = [
    { date: "Mon", users: 120, revenue: 1560, tests: 89 },
    { date: "Tue", users: 145, revenue: 1890, tests: 102 },
    { date: "Wed", users: 132, revenue: 1720, tests: 95 },
    { date: "Thu", users: 167, revenue: 2170, tests: 118 },
    { date: "Fri", users: 189, revenue: 2460, tests: 134 },
    { date: "Sat", users: 156, revenue: 2030, tests: 112 },
    { date: "Sun", users: 178, revenue: 2320, tests: 126 },
  ]

  const liveActivities = [
    { location: "Toronto, ON", action: "Quiz completed", time: "2 min ago", flag: "🇨🇦" },
    { location: "Vancouver, BC", action: "New user signup", time: "5 min ago", flag: "🇨🇦" },
    { location: "Montreal, QC", action: "Premium purchase", time: "8 min ago", flag: "🇨🇦" },
    { location: "London, UK", action: "Quiz completed", time: "12 min ago", flag: "🇬🇧" },
    { location: "Sydney, AU", action: "New user signup", time: "15 min ago", flag: "🇦🇺" },
  ]

  const provinceData = [
    { name: "Ontario", value: 35, color: COLORS.canadianRed },
    { name: "Quebec", value: 25, color: COLORS.coolBlue },
    { name: "British Columbia", value: 20, color: COLORS.successGreen },
    { name: "Alberta", value: 12, color: COLORS.charcoal },
    { name: "Others", value: 8, color: COLORS.grayText },
  ]

  const deviceUsage = [
    { name: "Mobile", value: 68, color: COLORS.coolBlue },
    { name: "Desktop", value: 28, color: COLORS.canadianRed },
    { name: "Tablet", value: 4, color: COLORS.successGreen },
  ]

  const alertsAndNotifications = [
    {
      id: 1,
      type: "alert",
      title: "Low Pass Rate Alert",
      message: "G2 Road Test pass rate dropped below 75% in Vancouver region",
      priority: "high",
      timestamp: "5 minutes ago",
      icon: AlertCircle,
      unread: true,
    },
    {
      id: 2,
      type: "system",
      title: "Peak Testing Hours",
      message: "High traffic detected - 347 active test sessions",
      priority: "medium",
      timestamp: "12 minutes ago",
      icon: Clock,
      unread: true,
    },
    {
      id: 3,
      type: "milestone",
      title: "Achievement Unlocked",
      message: "10,000th test completed this month!",
      priority: "low",
      timestamp: "1 hour ago",
      icon: Award,
      unread: false,
    },
  ]

  const getMetricValue = (region: any) => {
    const metric: any = 'users';
    switch (metric) {
      case "users":
        return region.users
      case "quizzes":
        return region.quizzes
      case "revenue":
        return `$${region.revenue}`
      case "growth":
        return `${region.growth}%`
      default:
        return region.users
    }
  }


  const renderChart = () => {
    switch (activeChart) {
      case "area":
        return (
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={COLORS.canadianRed} stopOpacity={0.8} />
                <stop offset="95%" stopColor={COLORS.canadianRed} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" stroke={COLORS.grayText} />
            <YAxis stroke={COLORS.grayText} />
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderGray} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.white,
                borderColor: COLORS.coolBlue,
                borderRadius: "8px",
                border: `1px solid ${COLORS.borderGray}`,
              }}
            />
            <Area
              type="monotone"
              dataKey={activeMetric}
              stroke={COLORS.canadianRed}
              fillOpacity={1}
              fill="url(#colorMetric)"
            />
          </AreaChart>
        )
      case "bar":
        return (
          <BarChart data={chartData}>
            <XAxis dataKey="date" stroke={COLORS.grayText} />
            <YAxis stroke={COLORS.grayText} />
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderGray} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.white,
                borderColor: COLORS.coolBlue,
                borderRadius: "8px",
                border: `1px solid ${COLORS.borderGray}`,
              }}
            />
            <Bar dataKey={activeMetric} fill={COLORS.coolBlue} radius={[4, 4, 0, 0]} />
          </BarChart>
        )
      case "line":
        return (
          <LineChart data={chartData}>
            <XAxis dataKey="date" stroke={COLORS.grayText} />
            <YAxis stroke={COLORS.grayText} />
            <CartesianGrid strokeDasharray="3 3" stroke={COLORS.borderGray} />
            <Tooltip
              contentStyle={{
                backgroundColor: COLORS.white,
                borderColor: COLORS.coolBlue,
                borderRadius: "8px",
                border: `1px solid ${COLORS.borderGray}`,
              }}
            />
            <Line
              type="monotone"
              dataKey={activeMetric}
              stroke={COLORS.successGreen}
              strokeWidth={3}
              dot={{ fill: COLORS.charcoal, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: COLORS.canadianRed }}
            />
          </LineChart>
        )
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <select
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>

            <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 hover:bg-red-700 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="py-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>


        {/* World Map Visualization */}
        <div
          className="bg-white border border-gray-200 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-charcoal mb-6">Users on the Map ({markers.length})</h3>
          <div className="h-96 bg-gradient-to-br from-cool-blue/10 to-success-green/10 rounded-lg flex items-center justify-center relative overflow-hidden">

            <div id="map" ref={mapRef} className="absolute inset-0">

            </div>


            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
              <div className="text-xs text-gray-text mb-2">Legend</div>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-canadianRed rounded-full"></div>
                  <span>High Activity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-coolBlue rounded-full"></div>
                  <span>Medium Activity</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-successGreen rounded-full"></div>
                  <span>Low Activity</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Regional Data */}
        <div
          className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-charcoal">Regional Performance</h3>
          </div>

          <div className="space-y-4">
            {worldData.regions.map((region) => (
              <div
                key={region.code}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-2xl">{region.flag}</div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{region.name}</h4>
                    <p className="text-sm text-gray-text">{region.code}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-bold text-charcoal">{getMetricValue(region)}</div>
                  <div className="text-sm text-success-green">+{region.growth}% growth</div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Test Categories */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2 sm:mb-0">Test Categories Performance</h3>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              <Eye size={16} />
              <span>View Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {testCategories.map((category) => (
              <div
                key={category.name}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg text-white" style={{ backgroundColor: category.color }}>
                    <category.icon size={20} />
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Total Tests</div>
                    <div className="text-lg font-bold text-gray-900">{category.totalTests.toLocaleString()}</div>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3 text-sm">{category.name}</h4>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Pass Rate</span>
                    <span className="text-xs font-semibold text-green-600">{category.passRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.passRate}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    <span className="text-xs text-gray-600">Avg Score</span>
                    <span className="text-xs font-semibold text-blue-600">{category.avgScore}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Analytics Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 md:mb-0">Performance Analytics</h3>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Metric:</span>
                  <select
                    value={activeMetric}
                    onChange={(e) => setActiveMetric(e.target.value as any)}
                    className="px-3 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="revenue">Revenue</option>
                    <option value="users">Users</option>
                    <option value="tests">Tests</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Chart:</span>
                  <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setActiveChart("area")}
                      className={`p-2 rounded-md transition-colors ${activeChart === "area" ? "bg-white" : "hover:bg-gray-200"}`}
                      title="Area Chart"
                    >
                      <AreaChartIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveChart("bar")}
                      className={`p-2 rounded-md transition-colors ${activeChart === "bar" ? "bg-white" : "hover:bg-gray-200"}`}
                      title="Bar Chart"
                    >
                      <BarChart2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveChart("line")}
                      className={`p-2 rounded-md transition-colors ${activeChart === "line" ? "bg-white" : "hover:bg-gray-200"}`}
                      title="Line Chart"
                    >
                      <LineChartIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-64 lg:h-80">
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="bg-green-500 p-2 rounded-lg text-white">
                    <Plus size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">Create New Test</div>
                    <div className="text-xs text-gray-500">Add assessment questions</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="bg-blue-500 p-2 rounded-lg text-white">
                    <AnalyticsIcon size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">Analytics Report</div>
                    <div className="text-xs text-gray-500">Generate detailed insights</div>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all">
                  <div className="bg-red-500 p-2 rounded-lg text-white">
                    <Download size={16} />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900 text-sm">Export Data</div>
                    <div className="text-xs text-gray-500">Download test results</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Alerts & Updates</h3>
                <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
              </div>

              <div className="space-y-3">
                {alertsAndNotifications.slice(0, 3).map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 rounded-lg border-l-4 ${alert.priority === "high"
                      ? "border-red-500 bg-red-50"
                      : alert.priority === "medium"
                        ? "border-yellow-500 bg-yellow-50"
                        : "border-green-500 bg-green-50"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-1 rounded-full ${alert.priority === "high"
                          ? "bg-red-100 text-red-600"
                          : alert.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                          }`}
                      >
                        <alert.icon size={14} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1 text-sm">{alert.title}</h4>
                        <p className="text-xs text-gray-600 mb-1">{alert.message}</p>
                        <div className="text-xs text-gray-500">{alert.timestamp}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Performing Quizzes */}
          <div className="bg-white lg:col-span-2 rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-bold text-charcoal mb-6">Top Performing Quizzes</h3>
            <div className="space-y-4">
              {topQuizzes.map((quiz, index) => (
                <QuizProgress
                  key={index}
                  name={quiz.name}
                  completions={quiz.completions}
                  passRate={quiz.passRate}
                  color={demographicColors[index % demographicColors.length]}
                />
              ))}
            </div>
          </div>

          <div className="bg-white space-y-4 rounded-xl border border-gray-200 p-6">

            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-charcoal">Live Activity</h3>
              <div className="w-2 h-2 bg-successGreen rounded-full animate-pulse"></div>
            </div>

            {liveActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg"
              >
                <div className="text-lg">{activity.flag}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-charcoal">{activity.action}</p>
                  <p className="text-xs text-gray-text">{activity.location}</p>
                  <p className="text-xs text-gray-text">{activity.time}</p>
                </div>
              </div>
            ))}

            <button
              className="w-full cursor-pointer mt-4 py-2 text-sm text-coolBlue hover:text-coolBlue/80 font-medium transition-colors"
            >
              View All Activity
            </button>
          </div>


        </div>

        {/* Recent Tests and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Test Results */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Test Results</h3>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Filter size={16} className="text-gray-600" />
                </button>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                  <Search size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {recentTests.slice(0, 4).map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${test.status === "passed" ? "bg-green-500" : "bg-red-500"
                        }`}
                    >
                      {test.status === "passed" ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    </div>

                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{test.testTaker}</div>
                      <div className="text-xs text-gray-600">{test.testType}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <MapPin size={10} />
                        {test.location}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${test.status === "passed" ? "text-green-600" : "text-red-600"}`}
                    >
                      {test.score}%
                    </div>
                    <div className="text-xs text-gray-500">{test.duration}</div>
                    <div className="text-xs text-gray-400">{test.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Test Locations</h3>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                className="px-3 py-1 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="ON">Ontario</option>
                <option value="BC">British Columbia</option>
                <option value="AB">Alberta</option>
                <option value="QC">Quebec</option>
                <option value="ALL">All Provinces</option>
              </select>
            </div>

            <div className="bg-gray-100 rounded-lg h-64 lg:h-80 flex items-center justify-center relative overflow-hidden">
              {/* Simplified Canada Map Representation */}
              <div className="absolute inset-0 p-4">
                <div className="relative w-full h-full">
                  {/* Map markers for recent tests */}
                  {recentTests.map((test, index) => (
                    <div
                      key={test.id}
                      className={`absolute w-3 h-3 rounded-full border-2 border-white cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${test.status === "passed" ? "bg-green-500" : "bg-red-500"
                        }`}
                      style={{
                        left: `${20 + index * 15}%`,
                        top: `${30 + index * 10}%`,
                      }}
                      title={`${test.testTaker} - ${test.location}`}
                    />
                  ))}

                  {/* Canada outline representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin size={48} className="text-red-600 mx-auto mb-2" />
                      <p className="text-gray-600 font-semibold">Interactive Canada Map</p>
                      <p className="text-sm text-gray-500 mt-1">Real-time test locations across Canada</p>
                      <div className="flex items-center justify-center gap-4 mt-3">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Passed</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">Failed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Province Distribution */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Test Distribution by Province</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={provinceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {provinceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.coolBlue,
                      borderRadius: "8px",
                      border: `1px solid ${COLORS.borderGray}`,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Usage */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 lg:p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Device Usage</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={deviceUsage}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {deviceUsage.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.coolBlue,
                      borderRadius: "8px",
                      border: `1px solid ${COLORS.borderGray}`,
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

// Enhanced StatsCard component
const StatsCard: React.FC<any> = ({
  title,
  value,
  change,
  changeType,
  icon: Icon,
  color,
  progressValue,
  chartData,
}) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="p-4 lg:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-lg text-white" style={{ backgroundColor: color }}>
            <Icon size={20} />
          </div>

          <div
            className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${changeType === "positive" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
          >
            {changeType === "positive" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
            <span className="ml-1">{change}</span>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <p className="text-2xl lg:text-3xl font-bold text-gray-900">{value}</p>
        </div>

        {progressValue ? (
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${progressValue}%`,
                    backgroundColor: color,
                  }}
                ></div>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-700">{progressValue}%</span>
          </div>
        ) : (
          chartData && (
            <div className="flex items-end justify-between h-8 gap-1">
              {chartData.map((value: number, index: number) => (
                <div
                  key={index}
                  className="w-2 rounded-t transition-all duration-300"
                  style={{
                    height: `${(value / Math.max(...chartData)) * 100}%`,
                    backgroundColor: `${color}40`,
                  }}
                ></div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Dashboard


const QuizProgress = ({ name, completions, passRate, color }: {
  name: string
  completions: number
  passRate: number
  color: string
}) => {
  return (
    <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-charcoal">{name}</h4>
        <div className="text-right">
          <div className="text-lg font-bold text-charcoal">{passRate}%</div>
          <div className="text-sm text-grayText">Pass Rate</div>
        </div>
      </div>

      <div className="text-sm text-grayText mb-2">{completions.toLocaleString()} completions</div>

      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="h-2.5 rounded-full"
          style={{
            width: `${passRate}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  )
}
