const handleWithdraw = async () => {
  try {
    const response = await fetch("/api/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: withdrawAmount }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Withdrawal request successful! Funds will arrive in 2-5 business days.");
      // Update balance (fetch latest from Stripe)
    } else {
      alert("Error: " + data.error);
    }
  } catch (err) {
    alert("Failed to request withdrawal. Please try again.");
  }
};