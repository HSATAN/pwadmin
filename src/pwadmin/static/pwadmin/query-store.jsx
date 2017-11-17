import {computed} from 'mobx';
import {QueryStore} from '../dj-react/store/query.jsx';

class SneakQueryStore extends QueryStore {
    @computed
    get num_pages() {
        const response = this.response;
        const page_info = !_.isEmpty(response.data) && response.data.code.toString() === '0' ? response.data.page_info : {};
        return Math.ceil(page_info.row_count / page_info.page_size);
    }

    @computed
    get respData() {
        const response = this.response;
        return (!_.isEmpty(response.data) && response.data.code.toString() === '0') ? response.data.data : [];
    }
}

export {SneakQueryStore}