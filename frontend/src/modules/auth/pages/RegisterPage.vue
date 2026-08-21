<script setup lang="ts">
import { reactive } from 'vue'
import { useRegister } from '../composables/useRegister'
import type { RegisterRequest } from '../types/auth'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Message from 'primevue/message'

const { register, loading, error } = useRegister()

const form = reactive<RegisterRequest>({
  name: '',
  email: '',
  password: '',
})

async function handleRegister() {
  await register(form)
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <form class="flex w-full max-w-sm flex-col gap-4" @submit.prevent="handleRegister">
      <div>
        <label for="name" class="mb-2 block"> Name </label>

        <InputText id="name" v-model="form.name" type="text" fluid />
      </div>

      <div>
        <label for="email" class="mb-2 block"> Email </label>

        <InputText id="email" v-model="form.email" type="email" fluid />
      </div>

      <div>
        <label for="password" class="mb-2 block"> Password </label>

        <Password id="password" v-model="form.password" :feedback="false" toggle-mask fluid />
      </div>

      <Message v-if="error" severity="error">
        {{ error }}
      </Message>

      <Button type="submit" label="Register" :loading="loading" fluid />
    </form>
  </div>
</template>
