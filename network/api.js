import http from "./http.js"

//header
const header = {
	"content-type":"application/x-www-form-urlencoded"
}

//获取本土疫情(diseaseh5Shelf){areaTree,chinaAdd,chinaTotal}和 疫情速报(localCityNCOVDataList)
export const getLocalCOVAndNewCOV = () =>{
	const data = {
		'modules': 'localCityNCOVDataList,diseaseh5Shelf'
	}
	return http.post('/query/inner/publish/modules/list',data,header)
}

//获取现有本土确诊&本土无症状（chinaDayListNew）和 新增 本土确诊&本土无症状（chinaDayAddListNew）数据
//数据用于渲染echarts
//参数（必须）limit  （default 30：30天   可选 ：60  90 182 365 ）
export const getNowDiseaseCaseAndAddDiseaseCase = (limit) => {
	const data = {
		'modules': 'chinaDayListNew,chinaDayAddListNew',
		'limit': limit
	}
	return http.post('/query/inner/publish/modules/list',data,header)
}
//全球疫情数据 FAutoCountryConfirmAdd,WomWorld,WomAboard
export const getForeignCountryCOV = () =>{
	const data = {
		'modules': 'FAutoCountryConfirmAdd,WomWorld,WomAboard'
	}
	return http.post('/automation/modules/list',data,header)
}

//根据 adCode（地区码）获取 limit 条疫情数据
export const getLocalCOVDataByAdcode = (adCode) =>{
	//limit 默认30条
	return http.get(`/query/pubished/daily/list?adCode=${adCode}&limit=30`)
}