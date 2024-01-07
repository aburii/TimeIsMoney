<script setup lang="ts">
const formValue = reactive({
  email: "",
  nickname: "",
  lastname: "",
  firstname: "",
  password: "",
});
const loading = ref(false);
const showPassword = ref(false);
const passwordInputType: ComputedRef<"password" | "text"> = computed(() => {
  return showPassword.value ? "text" : "password";
});

const submitDisabled = computed(() => {
  return (
    !formValue.email ||
    !formValue.nickname ||
    !formValue.firstname ||
    !formValue.lastname ||
    !formValue.password
  );
});

const submit = async () => {
  loading.value = true;
  if (submitDisabled.value) {
    return;
  }

  const response = await useCreateUser()(formValue);

  loading.value = false;

  if (!response.ok) {
    return alert("Error happened while creating user");
  }

  return navigateTo("/admin/users");
};
</script>

<template>
  <section class="w-full">
    <div class="max-w-5xl mx-auto mt-10">
      <form
        class="w-full space-y-3"
        @submit.prevent="submit"
        autocomplete="off"
      >
        <label class="form-control w-full">
          <span class="label block">
            <span class="label-text font-bold">Nickname*</span>
          </span>
          <input
            type="text"
            v-model="formValue.nickname"
            placeholder="email@timeismoney.com"
            class="input input-bordered w-full"
          />
        </label>

        <div class="w-full flex gap-5">
          <label class="form-control w-full">
            <span class="label block">
              <span class="label-text font-bold">Firstname*</span>
            </span>
            <input
              type="text"
              v-model="formValue.firstname"
              placeholder="John"
              class="input input-bordered w-full"
            />
          </label>

          <label class="form-control w-full">
            <span class="label block">
              <span class="label-text font-bold">Lastname*</span>
            </span>
            <input
              type="text"
              v-model="formValue.lastname"
              placeholder="Doe"
              class="input input-bordered w-full"
            />
          </label>
        </div>

        <label class="form-control w-full">
          <span class="label block">
            <span class="label-text font-bold">@mail*</span>
          </span>
          <input
            type="text"
            v-model="formValue.email"
            placeholder="email@timeismoney.com"
            class="input input-bordered w-full"
          />
        </label>

        <label class="form-control w-full">
          <span class="label block">
            <span class="label-text font-bold">Password*</span>
          </span>
          <input
            :type="passwordInputType"
            v-model="formValue.password"
            class="input input-bordered w-full"
          />
        </label>
        <span class="italic text-xs text-gray-700"
          >1 uppercase, 1 digit, 1 lowercase</span
        >

        <div class="form-control max-w-xs">
          <label class="space-x-2 cursor-pointer w-fit">
            <input
              type="checkbox"
              v-model="showPassword"
              class="checkbox checkbox-sm align-middle"
            />
            <span class="label-text align-middle"> Show password </span>
          </label>
        </div>

        <UIButton
          id="loginButton"
          class="!mt-16 w-full text-center text-white btn-primary"
          label="Create"
          loading-label="Chargement"
          :loading="loading"
          :disabled="submitDisabled"
          type="submit"
        />
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
