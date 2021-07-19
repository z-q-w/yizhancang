import TLS from 'im-live-sells'
import TIM from 'tim-js-sdk' //Web 环境
 
 const TLSData = TLS
 
 function getTls(roomID,userSig,userName){
	 const tls = new TLS({
	       TIM: TIM,
	       SDKAppID: 1400380849,
	       userSig: userSig,
	       roomID: roomID,
	       userName: userName
	 })
	return tls
 }
 export default {
 	getTls,
	TLSData,
 }