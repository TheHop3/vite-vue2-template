import request from "@/utils/request";

/**
 * 登录
 * @param data {object} 登录信息
 * @param data.username {string} 用户名
 * @param data.password {string} 密码
 * @returns
 */
export function login(data) {
  return request({
    url: "/api/login",
    method: "POST",
    data,
  });
}
