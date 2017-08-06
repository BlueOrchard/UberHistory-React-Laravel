import {observable} from 'mobx';
import axios from 'axios';

class MainStore {
    @observable loading = false;

    @observable authenticated = false;
    @observable code = null;
    @observable useDefault = false;
    
    @observable tokenArray = [];
    @observable userArray = [];
    @observable historyArray = [];

    getUberAccess(){
        //Get Token
        this.loading = true;
        axios.get('api/index.php/get-token', {
            params: {
                code: this.code
            }
        }).then((response) => {
            this.tokenArray = response.data;

            //If no error
            if(!response.data.error){
                this.loading = true;

                //Get User
                axios.get('api/index.php/get-user', {
                    params: {
                        token: this.tokenArray.access_token
                    }
                }).then((response) => {
                    this.userArray = response.data;
                    //console.log(this.userArray);
                    this.authenticated = true;
                    this.loading = false;

                    this.getHistory();
                });
            }
        });
    }

    getHistory(){
        this.loading = true;

        axios.get('api/index.php/get-history', {
            params: {
                token: this.tokenArray.access_token,
                uuid: this.userArray.uuid,
                default: this.useDefault
            }
        }).then((response) => {
            this.historyArray = response.data;
            this.loading = false;
        });
    }
}

const store = new MainStore();

export default store;