import * as axios from 'axios'

export const currencyAPI = {
    getAllCurrencies() {
        return axios({
            method: "GET",
            url: `http://api.exchangeratesapi.io/v1/latest?access_key=a0e716a65c36ea8183a07f5cf5f9524d`,
        })
            .then((response) => {
                console.log(response.data.rates);
                return response.data.rates
            })
            .catch((error) => {
                console.log(error);
            });
    }
}
