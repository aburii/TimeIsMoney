<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
});

const session = useSessionStore();
const route = useRoute();

const getUser = useGetUser();
const loading = ref(false);
const user = ref<any>();

const fetchUser = async () => {
  const id = route.params.id;

  if (!id || Array.isArray(id)) {
    return navigateTo("/admin");
  }
  const response = await getUser(id);

  if (!response.ok) {
    return alert("Error happened while fetching user");
  }

  user.value = response.data;
};

onMounted(async () => {
  await fetchUser();
  formValue.email = user.value?.email;
  formValue.nickname = user.value?.nickname;
  formValue.firstname = user.value?.firstname;
  formValue.lastname = user.value?.lastname;
});

const formValue = reactive<Partial<any>>({});

const submit = async () => {
  loading.value = true;
  if (!user.value) {
    return;
  }

  const response = await useUpdateUser()(user.value.id, formValue);

  loading.value = false;

  if (!response.ok) {
    return alert("Error happened while patching user");
  }

  return fetchUser();
};
</script>

<template>
  <section class="w-full" v-if="user">
    <div class="max-w-5xl mx-auto mt-10">
      <form class="w-full space-y-3" @submit.prevent="submit">
        <label class="form-control w-full">
          <span class="label block">
            <span class="label-text font-bold">Nickname</span>
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
              <span class="label-text font-bold">Firstname</span>
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
              <span class="label-text font-bold">Lastname</span>
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
            <span class="label-text font-bold">@mail</span>
          </span>
          <input
            type="text"
            v-model="formValue.email"
            placeholder="email@timeismoney.com"
            class="input input-bordered w-full"
          />
        </label>

        <UIButton
          v-if="session.user?.id === user.id || session.user?.role === 'ADMIN'"
          id="loginButton"
          class="!mt-16 w-full text-center text-white btn-primary"
          label="Edit"
          loading-label="Loading"
          :loading="loading"
          type="submit"
        />
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
