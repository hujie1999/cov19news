
const BASE_URL = 'https://api.inews.qq.com/newsqa/v1'
//https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list
//https://api.inews.qq.com/newsqa/v1/query/inner/publish/modules/list?modules=localCityNCOVDataList,diseaseh5Shelf
const request = (options)=>{
	
	return new Promise((resolve,reject)=>{
		uni.request({
			url: BASE_URL + options.url,
			data: options.data || null,
			method: options.method,
			header: options.header || null,
			success: (res) => {
				return resolve(res.data)
			},
			fail: (err) => {
				return reject(err)
			}
		})
	})
}

export default request