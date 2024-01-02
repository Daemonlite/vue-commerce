import axiosClient from '../../axiosClient'

export function getProductBuId({commit},id){
    axiosClient.get(`products/${id}`)
    .then(({data})=>{
        commit("setSingleProduct",data)
    })
}



export function getCategoryByName({commit},name){
    axiosClient.get(`products/category/${name}`)
    .then(({data})=>{
        commit("setSingleCategory",data)
    })
}

export function getCart({commit},userId){
    axiosClient.get(`carts/user/${userId}`)
    .then(({data})=>{
        commit("setCartProduct",data)
    })
}

export function addToCart({commit},userId,date,product){
    axiosClient.post('carts',{
        userId,
        date,
        products:[product]
    })
    .then(({data})=>{
        commit("setCartProduct",data)
    })
}

