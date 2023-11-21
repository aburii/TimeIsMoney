<template>
  <section class="flex gap-20 flex-col py-20">
    <div class="text-center">
      <h2 class="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold mb-2">
        Tendances et Analyses en Temps Réel des Cryptomonnaies
      </h2>
      <p class="text-sm md:text-base lg:text-lg xl:text-xl mb-4">
        Découvrez les dernières tendances des cryptomonnaies avec nos graphiques
        clairs et interactifs. Analysez facilement les performances et anticipez
        les mouvements du marché pour une prise de décision avisée.
      </p>
    </div>
    <div
      class="stat-container flex flex-wrap items-center justify-center self-stretch gap-12"
    >
      <HomeCustomBigBox :color="customColor1">
        <img class="h-full" src="@/assets/img/chart1.png" alt="crypto" />
      </HomeCustomBigBox>
      <HomeCustomBigBox :color="customColor2">
        <img class="h-full" src="@/assets/img/chart2.png" alt="crypto" />
      </HomeCustomBigBox>
      <HomeCustomBigBox :color="customColor3">
        <img class="h-full" src="@/assets/img/chart3.png" alt="crypto" />
      </HomeCustomBigBox>
    </div>
  </section>
</template>

<script setup>
const customColor1 = "from-[#FDFFB6] from-0% to-[#1D232A] to-70%";
const customColor2 = "from-[#1D232A] from-30% to-[#a2d2ff] to-100%";
const customColor3 = "from-[#FFD6A5] from-0% to-[#1D232A] to-70%";
</script>
