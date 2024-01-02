/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
	userInfo?: WechatMiniprogram.UserInfo,
	systemInfo?:WechatMiniprogram.SystemInfo,
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}