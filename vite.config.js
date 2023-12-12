import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import vue2 from "@vitejs/plugin-vue2";

export default ({ mode }) => {
  const {
    VITE_PORT,
    VITE_BASE_URL,
    VITE_PROXY_DOMAIN,
    VITE_PROXY_DOMAIN_REAL,
    VITE_APP_TARGET_BASE_API,
  } = loadEnv(mode, process.cwd());

  return defineConfig({
    base: VITE_BASE_URL,
    plugins: [vue2()],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      // 是否开启 https
      https: false,
      // 端口号
      port: VITE_PORT,
      // 允许IP访问
      host: "0.0.0.0",
      // 服务启动时是否自动打开浏览器
      open: true,
      // 允许跨域
      cors: true,
      // 自定义代理规则
      proxy: {
        /** 接口代理解决跨域 * */
        [VITE_PROXY_DOMAIN]: {
          changeOrigin: true,
          target: VITE_PROXY_DOMAIN_REAL, // https://api.xxx.com
          rewrite: (path) =>
            path.replace(
              new RegExp(`^${VITE_PROXY_DOMAIN}`), // ^/dev-api
              VITE_APP_TARGET_BASE_API // ""
            ), // 以 /dev-api 开头的请求转发至 target，示例： http://localhost:9957/dev-api/v1/users (F12可见) 代理转发 https://api.xxx.com/v1/users (真实接口地址)
        },
      },
    },
    build: {
      // 设置最终构建的浏览器兼容目标
      target: "es2015",
      // 构建后是否生成 source map 文件
      sourcemap: false,
      //  chunk 大小警告的限制（以 kbs 为单位）
      chunkSizeWarningLimit: 2000,
      // 启用/禁用 gzip 压缩大小报告
      reportCompressedSize: false,
    },
  });
};
