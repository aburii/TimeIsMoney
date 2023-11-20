<template>
  <section
    class="flex flex-col-reverse bg-base-100 text-base-content py-4 md:py-8 lg:py-16 px-8 md:px-10 lg:px-16 justify-between items-center lg:items-stretch lg:flex-row gap-10 lg:gap-20"
  >
    <div class="flex flex-col items-start gap-4 lg:gap-8 lg:w-2/3 xl:w-3/5">
      <h2 class="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
        Révolutionnez Votre Expérience de la Cryptomonnaie avec The Count of
        Money
      </h2>
      <p class="text-sm md:text-base lg:text-lg xl:text-xl text-justify mb-4">
        Découvrez The Count of Money, votre hub essentiel pour la cryptomonnaie.
        Suivez, analysez et gérez vos actifs facilement avec nos outils avancés
        et mises à jour instantanées. Rejoignez-nous et prenez le contrôle de
        votre avenir financier dès aujourd'hui !
      </p>
      <div class="buttons flex flex-row items-center gap-4 lg:gap-8">
        <button class="btn btn-accent py-2 px-4 rounded-md">
          Explorer plus
        </button>

        <button class="btn btn-secondary py-2 px-4 rounded-md">
          Commencer
        </button>
      </div>
    </div>
    <div class="img-container w-[60%] sm:w-[50%] md:w-[40%] lg:w-auto">
      <img
        src="@/assets/img/crypto.png"
        class="w-full"
        alt="Logo Count of Money"
      />
    </div>
  </section>
</template>
<style scoped>
@media screen and (max-width: 480px) {
  .img-container {
    width: 100%;
  }
}

@media screen and (max-width: 336px) {
  .buttons {
    flex-direction: column;
  }
}
</style>
