<template>
  <section
    class="bg-base-200 flex flex-col items-center py-8 md:py-16 lg:py-24 xl:py-32 gap-y-8 md:gap-y-16 lg:gap-y-24"
  >
    <article
      class="w-full flex flex-col-reverse md:flex-row-reverse items-center justify-evenly gap-5"
    >
      <div
        class="flex flex-col w-full md:w-[500px] gap-7 flex-col justify-between items-center md:items-start text-center md:text-left"
      >
        <h3
          class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold lg:mb-2"
        >
          Personnalisez Votre Expérience avec les Cryptomonnaies de Votre Choix
        </h3>
        <p class="text-sm md:text-base">
          Accédez à une revue de presse crypto sur mesure. Définissez vos
          mots-clés pour filtrer le contenu et restez à jour avec les dernières
          tendances et développements pertinents, directement depuis votre
          tableau de bord.
        </p>
        <NuxtLink to="/cryptocurrencies"><button class="btn btn-secondary py-2 px-4 rounded-md">
          Commencer
        </button></NuxtLink>
      </div>
      <div class="w-full sm:w-[500px] border-solid border-black border-[4px]">
        <img
          src="@/assets/img/cryptocurrencies.png"
          alt="Cryptocurrencies"
          class="w-full h-full object-cover"
        />
      </div>
    </article>
    <article
      class="w-full flex flex-col-reverse md:flex-row items-center justify-evenly gap-5"
    >
      <div
        class="flex flex-col w-full md:w-[500px] gap-7 flex-col justify-between items-center md:items-start text-center md:text-left"
      >
        <h3
          class="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold lg:mb-2"
        >
          Votre Revue de Presse Crypto, Affinée selon Vos Préférences
        </h3>
        <p class="text-sm md:text-base">
          Personnalisez votre liste de cryptomonnaies selon vos préférences
          d'investissement. Suivez et gérez efficacement les monnaies de votre
          choix pour une gestion de portefeuille optimisée.
        </p>
         <NuxtLink to="/news"><button class="btn btn-accent py-2 px-4 rounded-md">
          Explorer plus
        </button></NuxtLink>
      </div>
      <div class="w-full sm:w-[500px] border-solid border-black border-[4px]">
        <img
          src="@/assets/img/news.png"
          alt="News"
          class="w-full h-full object-cover"
        />
      </div>
    </article>
  </section>
</template>
