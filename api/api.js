import request from "./../utils/request.js";
/**
 * 公共接口 ，优惠券接口 , 行业此讯 , 手机号码注册
 * 
*/

/**
 * 获取主页数据 无需授权
 * 
*/
export function getIndexData()
{
  return request.get("index",{},{ noAuth : true});
}


/**
 * 获取登录授权login
 * 
*/
export function getLogo()
{
  return request.get('wechat/get_logo', {}, { noAuth : true});
}

/**
 * 保存form_id
 * @param string formId 
 */
export function setFormId(formId) {
  return request.post("wechat/set_form_id", { formId: formId});
}

/**
 * 领取优惠卷
 * @param int couponId
 * 
*/
export function setCouponReceive(couponId){
  return request.post('coupon/receive', { couponId: couponId});
}
/**
 * 优惠券列表
 * @param object data
*/
export function getCoupons(data){
  return request.get('coupons',data,{noAuth:true})
}

/**
 * 我的优惠券
 * @param int types 0全部  1未使用 2已使用
*/
export function getUserCoupons(types){
  return request.get('coupons/user/'+types)
}

/**
 * 文章分类列表
 * 
*/
export function getArticleCategoryList(){
  return request.get('article/category/list',{},{noAuth:true})
}

/**
 * 文章列表
 * @param int cid
 * 
*/
export function getArticleList(cid,data){
  return request.get('article/list/' + cid, data,{noAuth:true})
}

/**
 * 文章 热门列表
 * 
*/
export function getArticleHotList(){
  return request.get('article/hot/list',{},{noAuth:true});
}

/**
 * 文章 轮播列表
 * 
*/
export function getArticleBannerList(){
  return request.get('article/banner/list',{},{noAuth:true})
}

/**
 * 文章详情
 * @param int id 
 * 
*/
export function getArticleDetails(id){
  return request.get('article/details/'+id,{},{noAuth:true});
}

/**
 * 手机号+验证码登录接口
 * @param object data
*/
export function loginMobile(data){
  return request.post('login/mobile',data,{noAuth:true})
}

/**
 * 验证码发送
 * @param object phone
*/
export function registerVerify(code, key, phone, reset){
  return request.post('register/verify', { code: code, key: key, phone: phone, type: reset === undefined ? 'reset' : reset },{noAuth:true})
}

/**
 * 手机号注册
 * @param object data
 * 
*/
export function phoneRegister(data){
  return request.post('register',data,{noAuth:true});
}

/**
 * 手机号修改密码
 * @param object data
 * 
*/
export function phoneRegisterReset(data){
  return request.post('register/reset',data,{noAuth:true})
}

/**
 * 手机号+密码登录
 * @param object data
 * 
*/
export function phoneLogin(data){
  return request.post('login',data,{noAuth:true})
}

/**
 * 切换H5登录
 * @param object data
*/
export function switchH5Login(){
  return request.post('switch_h5', { 'from':'routine'});
}

/**
 * 绑定手机号
 * 
*/
export function bindingPhone(data){
  return request.post('binding',data);
}

/**
 * 退出登錄
 * 
*/
export function logout(){
  return request.get('logout');
}

/**
 * 获取订阅消息id
 */
export function getTemlIds()
{
  return request.get('wechat/teml_ids', {}, { noAuth:true});
}

/**
 * 获取小程序直播列表
 */
export function getLiveList(page,limit) {
  return request.get('wechat/live', { page, limit}, { noAuth: true });
}

/**
 * 获取key值
 */
export function verifyCode() {
  return request.get('verify_code', {}, { noAuth: true });
}
/**
 * 获取城市信息
 */
export function getCity() {
  return request.get('city_list', { }, { noAuth: true });
}
/**
 * 底部自定义导航
 */
export function getNavigation() {
  return request.get('navigation', {}, { noAuth: true });
}
/**
 * 启动图
 */
export function getStartover() {
  return request.get('user/startover', {}, { noAuth: true });
}

/**
 * 绑定二维码
 */
export function bind_tg_code_index(data) {
  return request.post('bind_tg_code',data);
}