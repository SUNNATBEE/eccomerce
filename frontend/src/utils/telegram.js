/**
 * Telegram Bot API utility
 * Sends a message to a specific Telegram chat via a bot.
 */

// Replace these with your actual bot token and chat ID
const TELEGRAM_BOT_TOKEN = "7687147020:AAHg9Eil5eAG-GRK0_GkNEVnTUTTis0WJjk";
const TELEGRAM_CHAT_ID = "5333720014";

/**
 * Sends a notification to the Telegram bot
 * @param {string} message - The message content
 * @returns {Promise<boolean>} - Success status
 */
export const sendTelegramNotification = async (message) => {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
      }),
    });

    const data = await response.json();
    
    if (!data.ok) {
      console.error("Telegram API Error:", data.description);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error("Fetch Error:", error);
    return false;
  }
};
