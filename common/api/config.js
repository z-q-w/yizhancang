let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
	// url_config = 'http://192.168.1.166:8087/'   //刘耀
	// url_config = 'http://192.168.1.7:8087/'  //强哥
	// url_config = 'http://116.62.168.59:8087/'
	// https://www.fzgcn.com/

	url_config = 'https://www.fzgcn.com/api/'
}else{
    // 生产环境
    url_config = 'https://www.fzgcn.com/api/'
}
export default url_config
