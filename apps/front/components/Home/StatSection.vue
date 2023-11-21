<template>
  <section
    class="stat-container flex flex-wrap md:flex-row py-4 justify-center p-4 items-center self-stretch gap-12"
  >
    <HomeCustomBox :color="customColor1">
      <p>783</p>
      <p>Articles dans le blog</p>
    </HomeCustomBox>
    <HomeCustomBox :color="customColor2">
      <p>23 642</p>
      <p>Crypto-monnaies disponibles</p>
    </HomeCustomBox>
    <HomeCustomBox :color="customColor3">
      <p>109</p>
      <p>Membres inscrits</p>
    </HomeCustomBox>
  </section>
</template>

<script setup>
const customColor1 = "from-[#BDB2FF] from-0% to-[#1D232A] to-70%";
const customColor2 = "from-[#a2d2ff] from-0% to-[#1D232A] to-70%";
const customColor3 = "from-[#FFD6A5] from-0% to-[#1D232A] to-70%";
</script>
