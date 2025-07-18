# frontend/Dockerfile
FROM node:22.1.0

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Install serve for static hosting
RUN npm install -g serve

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173"]
