<template>
  <section
    class="flex gap-20 flex-col py-20 px-6 lg:px-12 bg-base-300 mt-32"
  >
    <div class="text-center">
      <h2 class="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold mb-3">
        Tendances et Analyses en Temps Réel des Cryptomonnaies
      </h2>
      <p class="text-sm md:text-base lg:text-lg xl:text-xl mb-4">
        Découvrez les dernières tendances des cryptomonnaies avec nos graphiques
        clairs et interactifs. Analysez facilement les performances et anticipez
        les mouvements du marché pour une prise de décision avisée.
      </p>
    </div>
    <div class="flex flex-wrap items-center justify-center self-stretch gap-12">
      <HomeCustomChartBox>
        <img class="h-full" src="@/assets/img/chart2.png" alt="graphique" />
      </HomeCustomChartBox>
      <HomeCustomChartBox>
        <img class="h-full" src="@/assets/img/chart1.png" alt="graphique" />
      </HomeCustomChartBox>
      <HomeCustomChartBox>
        <img class="h-full" src="@/assets/img/charts.png" alt="graphique" />
      </HomeCustomChartBox>
    </div>
  </section>
</template>
