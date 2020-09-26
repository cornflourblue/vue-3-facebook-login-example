<template>
    <h2>Edit Account</h2>
    <p>Updating the information here will only change it inside this application, it won't (and can't) change anything in the associated Facebook account.</p>
    <form v-if="account" @submit.prevent="handleSubmit">
        <div class="form-group">
            <label>Facebook Id</label>
            <div>{{account.facebookId}}</div>
        </div>
        <div class="form-group">
            <label>Name</label>
            <input type="text" v-model="account.name" class="form-control" />
        </div>
        <div class="form-group">
            <label>Extra Info</label>
            <input type="text" v-model="account.extraInfo" class="form-control" />
        </div>
        <div class="form-group">
            <button type="submit" :disabled="loading" class="btn btn-primary">
                <span v-if="loading" class="spinner-border spinner-border-sm mr-1"></span>
                Save
            </button>
            <router-link to="../../" class="btn btn-link">Cancel</router-link>
            <div v-if="error" class="alert alert-danger mt-3 mb-0">{{error}}</div>
        </div>
    </form>
    <div v-if="!account" class="text-center p-3">
        <span class="spinner-border spinner-border-lg align-center"></span>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { router } from '@/_helpers';
import { accountService } from '@/_services';

export default {
    setup() {
        const route = useRoute();
        const account = ref();
        const id = route.params.id;
        accountService.getById(id)
            .then(x => account.value = x);

        const loading = ref(false);
        const error = ref('');
        const handleSubmit = () => {
            loading.value = true;
            error.value = '';
            accountService.update(id, account.value)
                .then(() => {
                    router.push('../');
                })
                .catch(err => {
                    error.value = err;
                    loading.value = false;
                });
        }

        return {
            account,
            loading,
            error,
            handleSubmit
        }
    }
}
</script>