<template>
  <div class="chatbot" :class="{ 'chatbot--open': isOpen }">
    <!-- Speech bubble tooltip -->
    <transition name="chatbot-fade">
      <div v-if="showTooltip && !isOpen" class="chatbot__tooltip" role="tooltip">
        <div class="chatbot__tooltip-content">
          <span class="chatbot__tooltip-badge">AI</span>
          <span class="chatbot__tooltip-text">I'm Gopal's AI Assistant. Ask me anything about him! 🤖</span>
        </div>
        <button
          class="chatbot__tooltip-close"
          type="button"
          aria-label="Dismiss tooltip"
          @click.stop="dismissTooltip"
        >
          ✕
        </button>
        <div class="chatbot__tooltip-arrow" />
      </div>
    </transition>
    <!-- Floating trigger bubble -->
    <button
      id="chatbot-toggle-btn"
      class="chatbot__bubble"
      :class="{ 'chatbot__bubble--open': isOpen }"
      :aria-label="isOpen ? 'Close chat' : 'Ask me anything'"
      :title="isOpen ? 'Close chat' : 'Ask me anything about Gopal'"
      type="button"
      @click="toggleChat"
    >
      <span v-if="!isOpen" class="chatbot__bubble-icon">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.02 2 11c0 2.68 1.17 5.09 3.05 6.79L4 22l4.59-1.53C9.99 20.8 10.98 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2Z"
            fill="currentColor"
          />
          <path
            d="M8 10.5h8M8 13.5h5"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
        </svg>
      </span>
      <span v-else class="chatbot__bubble-close">✕</span>
      <span v-if="!isOpen" class="chatbot__bubble-label">Ask about me</span>
    </button>

    <!-- Chat window -->
    <transition name="chatbot-slide">
      <div v-if="isOpen" class="chatbot__window" role="dialog" aria-label="Chat with Gopal's assistant">
        <!-- Header -->
        <div class="chatbot__header">
          <div class="chatbot__header-info">
            <div class="chatbot__avatar">G</div>
            <div>
              <div class="chatbot__header-name">Gopal's Assistant</div>
              <div class="chatbot__header-status">
                <span class="chatbot__status-dot" />
                Online
              </div>
            </div>
          </div>
          <button class="chatbot__close-btn" type="button" aria-label="Close chat" @click.stop.prevent="toggleChat">✕</button>
        </div>

        <!-- Messages -->
        <div ref="messageList" class="chatbot__messages">
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="chatbot__message"
            :class="`chatbot__message--${msg.role}`"
          >
            <div v-if="msg.role === 'assistant'" class="chatbot__message-avatar">G</div>
            <div class="chatbot__message-bubble">
              <!-- eslint-disable-next-line vue/no-v-html -->
              <span v-html="formatMessage(msg.text)" />
            </div>
          </div>

          <!-- Typing indicator -->
          <div v-if="loading" class="chatbot__message chatbot__message--assistant">
            <div class="chatbot__message-avatar">G</div>
            <div class="chatbot__message-bubble chatbot__typing">
              <span /><span /><span />
            </div>
          </div>
        </div>

        <!-- Input area -->
        <form class="chatbot__input-area" @submit.prevent="sendMessage">
          <input
            id="chatbot-input"
            ref="inputField"
            v-model="inputText"
            class="chatbot__input"
            type="text"
            placeholder="Ask about Gopal's experience, skills…"
            :disabled="loading"
            autocomplete="off"
            maxlength="300"
            @keydown.enter.exact.prevent="sendMessage"
          />
          <button
            id="chatbot-send-btn"
            class="chatbot__send-btn"
            type="submit"
            :disabled="loading || !inputText.trim()"
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>

        <!-- Footer -->
        <div class="chatbot__footer">
          Powered by Gemini · Only knows about Gopal
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      inputText: '',
      loading: false,
      showTooltip: false,
      messages: [
        {
          role: 'assistant',
          text: "👋 Hi! I'm Gopal's AI assistant. Ask me anything about his experience, skills, projects, or education!"
        }
      ]
    }
  },
  watch: {
    isOpen(val) {
      if (process.client) {
        if (val) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = ''
        }
      }
    }
  },
  mounted() {
    const dismissed = localStorage.getItem('gopal_chatbot_tooltip_dismissed')
    if (!dismissed) {
      setTimeout(() => {
        this.showTooltip = true
      }, 1200)
    }
  },
  methods: {
    toggleChat() {
      if (this.isOpen) {
        // Blur input to dismiss mobile soft keyboard cleanly
        if (document.activeElement && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur()
        }
        // Force layout and fixed position recalculation
        setTimeout(() => {
          window.scrollTo(window.scrollX, window.scrollY)
        }, 100)
      } else {
        // Dismiss tooltip permanently on open
        this.dismissTooltip()
      }
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.$nextTick(() => {
          this.$refs.inputField && this.$refs.inputField.focus()
          this.scrollToBottom()
        })
      }
    },
    dismissTooltip() {
      this.showTooltip = false
      if (process.client) {
        localStorage.setItem('gopal_chatbot_tooltip_dismissed', 'true')
      }
    },
    async sendMessage() {
      const question = this.inputText.trim()
      if (!question || this.loading) return

      // Add user message
      this.messages.push({ role: 'user', text: question })
      this.inputText = ''
      this.loading = true
      this.$nextTick(this.scrollToBottom)

      try {
        const res = await fetch('/.netlify/functions/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question })
        })

        const data = await res.json()
        this.messages.push({
          role: 'assistant',
          text: data.answer || "Sorry, I couldn't get a response. Please try again!"
        })
      } catch {
        this.messages.push({
          role: 'assistant',
          text: "Oops! Something went wrong. Please try again in a moment."
        })
      } finally {
        this.loading = false
        this.$nextTick(this.scrollToBottom)
      }
    },
    scrollToBottom() {
      const el = this.$refs.messageList
      if (el) el.scrollTop = el.scrollHeight
    },
    formatMessage(text) {
      // Basic markdown-lite: bold, links
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noreferrer">$1</a>')
        .replace(/\n/g, '<br />')
    }
  }
}
</script>

<style lang="scss">
/* ── Floating bubble ───────────────────────────────────── */
.chatbot {
  bottom: 1.75rem;
  position: fixed;
  right: 1.75rem;
  z-index: 9999;

  @media (max-width: 480px) {
    &--open {
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      height: 100dvh;
      width: 100vw;
    }
  }
}

.chatbot__bubble {
  align-items: center;
  animation: chatbot-pulse 3s ease-in-out infinite;
  background: $color__primary;
  border: none;
  border-radius: 3rem;
  box-shadow: 0 4px 20px rgb(0 0 0 / 35%);
  color: #fff;
  cursor: pointer;
  display: flex;
  gap: 0.5rem;
  padding: 0.7rem 1.1rem 0.7rem 0.85rem;
  transition: transform 200ms ease, box-shadow 200ms ease, border-radius 200ms ease;

  &:hover {
    box-shadow: 0 6px 28px rgb(0 0 0 / 45%);
    transform: translateY(-2px);
  }

  &--open {
    animation: none;
    border-radius: 50%;
    padding: 0.7rem;

    @media (max-width: 480px) {
      display: none;
    }
  }

  svg {
    flex-shrink: 0;
    height: 1.5rem;
    width: 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 0.7rem;
  }
}

.chatbot__bubble-icon {
  display: flex;
}

.chatbot__bubble-close {
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1;
}

.chatbot__bubble-label {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  white-space: nowrap;

  @media (max-width: 480px) {
    display: none;
  }
}

@keyframes chatbot-pulse {
  0%,
  100% {
    box-shadow: 0 4px 20px rgb(0 0 0 / 35%);
  }

  50% {
    box-shadow: 0 4px 28px rgb(51 85 255 / 55%);
  }
}

/* ── Chat window ───────────────────────────────────────── */
.chatbot__window {
  background: $color__body;
  border: $border-weight solid $color__primary--muted;
  border-radius: $border-radius;
  bottom: 4.5rem;
  box-shadow: 0 8px 40px rgb(0 0 0 / 40%);
  display: flex;
  flex-direction: column;
  height: 30rem;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 22rem;

  @media (max-width: 480px) {
    bottom: 0;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    width: 100%;
    border: none;
    border-radius: 0;
  }
}

/* ── Header ────────────────────────────────────────────── */
.chatbot__header {
  align-items: center;
  background: $color__primary;
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
}

.chatbot__header-info {
  align-items: center;
  display: flex;
  gap: 0.6rem;
}

.chatbot__avatar {
  align-items: center;
  background: rgb(255 255 255 / 20%);
  border-radius: 50%;
  color: #fff;
  display: flex;
  flex-shrink: 0;
  font-weight: 700;
  height: 2rem;
  justify-content: center;
  width: 2rem;
}

.chatbot__header-name {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 600;
}

.chatbot__header-status {
  align-items: center;
  color: rgb(255 255 255 / 80%);
  display: flex;
  font-size: 0.75rem;
  gap: 0.3rem;
}

.chatbot__status-dot {
  animation: chatbot-blink 2s ease-in-out infinite;
  background: #4ade80;
  border-radius: 50%;
  display: inline-block;
  height: 0.45rem;
  width: 0.45rem;
}

@keyframes chatbot-blink {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}

.chatbot__close-btn {
  background: none;
  border: none;
  color: rgb(255 255 255 / 80%);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0.2rem 0.35rem;
  transition: color 150ms ease;

  &:hover {
    color: #fff;
  }
}

/* ── Messages ──────────────────────────────────────────── */
.chatbot__messages {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  overflow-y: auto;
  padding: 1rem;
  scroll-behavior: smooth;
}

.chatbot__message {
  display: flex;
  gap: 0.5rem;

  &--user {
    flex-direction: row-reverse;
  }
}

.chatbot__message-avatar {
  align-items: center;
  background: $color__primary--muted;
  border-radius: 50%;
  color: $color__primary;
  display: flex;
  flex-shrink: 0;
  font-size: 0.75rem;
  font-weight: 700;
  height: 1.75rem;
  justify-content: center;
  width: 1.75rem;
}

.chatbot__message-bubble {
  background: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: 1rem 1rem 1rem 0.25rem;
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: 80%;
  padding: 0.6rem 0.85rem;
  word-break: break-word;

  a {
    color: $color__primary;
    text-decoration: underline;
  }

  .chatbot__message--user & {
    background: $color__primary;
    border-color: $color__primary;
    border-radius: 1rem 1rem 0.25rem;
    color: #fff;
  }
}

/* ── Typing indicator ──────────────────────────────────── */
.chatbot__typing {
  align-items: center;
  display: flex;
  gap: 0.3rem;
  padding: 0.75rem 1rem;

  span {
    animation: chatbot-dot 1.2s ease-in-out infinite;
    background: $color__text--muted;
    border-radius: 50%;
    display: inline-block;
    height: 0.45rem;
    width: 0.45rem;

    &:nth-child(2) {
      animation-delay: 0.2s;
    }

    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes chatbot-dot {
  0%,
  80%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }

  40% {
    opacity: 1;
    transform: scale(1.3);
  }
}

/* ── Input area ────────────────────────────────────────── */
.chatbot__input-area {
  align-items: center;
  border-top: $border-weight solid $color__primary--muted;
  display: flex;
  gap: 0.5rem;
  padding: 0.6rem 0.75rem;
}

.chatbot__input {
  background: $color__body--overlay;
  border: $border-weight solid $color__primary--muted;
  border-radius: 2rem;
  color: $color__text;
  flex: 1;
  font-size: 0.875rem;
  outline: none;
  padding: 0.5rem 0.85rem;
  transition: border-color 150ms ease;

  &:focus {
    border-color: $color__primary;
  }

  &::placeholder {
    color: $color__text--muted;
    font-size: 0.8rem;
  }
}

.chatbot__send-btn {
  align-items: center;
  background: $color__primary;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  flex-shrink: 0;
  height: 2rem;
  justify-content: center;
  transition: opacity 150ms ease, transform 150ms ease;
  width: 2rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  &:not(:disabled):hover {
    transform: scale(1.08);
  }
}

/* ── Footer ────────────────────────────────────────────── */
.chatbot__footer {
  border-top: $border-weight solid $color__primary--muted;
  color: $color__text--muted;
  font-size: 0.7rem;
  padding: 0.35rem 1rem;
  text-align: center;
}

/* ── Transition ────────────────────────────────────────── */
.chatbot-slide-enter-active,
.chatbot-slide-leave-active {
  transition: opacity 200ms ease, transform 200ms ease;
}

.chatbot-slide-enter,
.chatbot-slide-leave-to {
  opacity: 0;
  transform: translateY(0.75rem) scale(0.97);
}

/* ── Tooltip ───────────────────────────────────────────── */
.chatbot__tooltip {
  background: $color__body;
  border: $border-weight solid $color__primary--muted;
  border-radius: 0.75rem;
  bottom: 4.5rem;
  box-shadow: 0 6px 20px rgb(0 0 0 / 30%);
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 2rem 0.75rem 0.85rem;
  position: absolute;
  right: 0;
  width: 16rem;
  z-index: 9998;
  animation: chatbot-bounce 2s infinite ease-in-out;
  
  @media (max-width: 480px) {
    right: -0.75rem;
    width: 14rem;
  }
}

.chatbot__tooltip-content {
  align-items: flex-start;
  display: flex;
  gap: 0.4rem;
}

.chatbot__tooltip-badge {
  background: $color__primary;
  border-radius: 0.25rem;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  padding: 0.1rem 0.3rem;
  text-transform: uppercase;
  margin-top: 0.1rem;
}

.chatbot__tooltip-text {
  color: $color__text;
  font-size: 0.8rem;
  line-height: 1.35;
  text-align: left;
}

.chatbot__tooltip-close {
  background: none;
  border: none;
  color: $color__text--muted;
  cursor: pointer;
  font-size: 0.8rem;
  line-height: 1;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  transition: color 150ms ease;

  &:hover {
    color: $color__text;
  }
}

.chatbot__tooltip-arrow {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid $color__primary--muted;
  bottom: -6px;
  height: 0;
  position: absolute;
  right: 1.5rem;
  width: 0;
  
  &::after {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid $color__body;
    bottom: 1px;
    content: "";
    height: 0;
    left: -5px;
    position: absolute;
    width: 0;
  }
}

@keyframes chatbot-bounce {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-4px);
  }
}

/* ── Fade transition ───────────────────────────────────── */
.chatbot-fade-enter-active,
.chatbot-fade-leave-active {
  transition: opacity 250ms ease, transform 250ms ease;
}

.chatbot-fade-enter,
.chatbot-fade-leave-to {
  opacity: 0;
  transform: translateY(0.5rem);
}
</style>
