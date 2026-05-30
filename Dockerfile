FROM node:18

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

# Installer Playwright + navigateurs
RUN npx playwright install
RUN npx playwright install-deps

COPY . .

CMD ["npm", "start"]
