<template>
  <div class="container flex flex-col mx-auto rounded-lg my-5">
    <div
      class="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5"
    >
      <div class="flex items-center justify-center w-full lg:p-12">
        <div class="flex items-center xl:p-10">
          <form
            class="flex flex-col w-full h-full pb-6 bg-base-200 p-10 text-center rounded-3xl"
          >
            <h3 class="mb-3 text-4xl font-extrabold text-dark-grey-900">
              Sign Up
            </h3>
            <p class="mb-4 text-grey-700">Enter an email and password</p>
            <a
              class="btn btn-accent flex items-center justify-center w-full mb-6 text-sm font-medium transition duration-300 rounded-2xl text-grey-900 bg-grey-300 hover:bg-grey-400 focus:ring-4 focus:ring-grey-300"
            >
              <img
                class="h-5 mr-2"
                src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                alt=""
              />
              Sign Up with Google
            </a>
            <div class="flex items-center mb-3">
              <hr class="h-0 border-b border-solid border-grey-500 grow" />
              <p class="mx-4 text-grey-600">or</p>
              <hr class="h-0 border-b border-solid border-grey-500 grow" />
            </div>
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >First Name*</label
            >
            <input
              id="first_name"
              type="name"
              placeholder="Firstname"
              class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >Last Name*</label
            >
            <input
              id="last_name"
              type="name"
              placeholder="Lastname"
              class="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-grey-400 mb-7 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="email" class="mb-2 text-sm text-start text-grey-900"
              >Email*</label
            >
            <input
              id="email"
              type="email"
              placeholder="name@email.com"
              class="flex items-center w-full px-5 py-4 text-sm font-medium outline-none focus:bg-grey-400 mb-5 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <label for="password" class="mb-2 text-sm text-start text-grey-900"
              >Password*</label
            >
            <input
              id="password"
              type="password"
              placeholder="Enter a password"
              class="flex items-center w-full px-5 py-4 mb-5 text-sm font-medium outline-none focus:bg-grey-400 placeholder:text-grey-700 bg-grey-200 text-dark-grey-900 rounded-2xl"
            />
            <button
              class="btn btn-primary w-full px-6 my-5 text-sm font-bold text-grey-900 md:w-96 rounded-2xl"
            >
              Sign Up
            </button>
            <div>
              <p class="text-sm leading-relaxed text-grey-900">
                Allready have an account?
                <NuxtLink to="/login" class="justify-self-end"
                  ><a class="font-bold text-grey-700">Login</a></NuxtLink
                >
              </p>
              <p class="text-sm leading-relaxed text-grey-900">
                <NuxtLink to="/mentions" class="justify-self-end"
                  ><a class="text-grey-700">Mentions légales et CGU</a>
                </NuxtLink>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
