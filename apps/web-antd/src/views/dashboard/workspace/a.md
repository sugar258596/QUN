<script setup lang="ts"></script>
<template>
  <div class="flex h-screen w-full items-center justify-center bg-[#1a2942]">
    <div
      class="relative flex h-[350px] w-[350px] items-center justify-center rounded-[50%] border border-solid border-cyan-300 shadow-[0_0_10px_rgba(80,173,232,1),inset_0_0_50px_rgba(80,173,232,0.3)] after:absolute after:left-1/2 after:top-1/2 after:h-1/2 after:w-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-[50%] after:border after:border-solid after:border-cyan-300 after:shadow-[0_0_10px_rgba(80,173,232,1),inset_0_0_50px_rgba(80,173,232,0.3)] after:content-['']"
    >
      <div
        class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      >
        <div
          class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
        >
          <div
            class="hologram-border absolute left-[-50%] top-[-50%] z-0 h-[200%] w-[200%] rounded-full"
          ></div>
          <div
            class="z-10 flex h-[95%] w-[95%] items-center justify-center rounded-full bg-white"
          ></div>
        </div>
        <!-- <div
          class="animate bg-gradient-to-r from-[rgba(80,173,232,0.8)] via-[rgba(99,102,241,0.8)] to-[rgba(80,173,232,0.8)] bg-[length:200%_auto] bg-clip-text text-6xl font-bold text-transparent"
        >
          21002938
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
    opacity: 1;
    filter: brightness(100%);
  }
  50% {
    background-position: 100% 50%;
    opacity: 0.8;
    filter: brightness(150%);
  }
  100% {
    background-position: 0% 50%;
    opacity: 1;
    filter: brightness(100%);
  }
}

.animate-gradient {
  animation: gradient 3s ease infinite;
}

.hologram-border {
  animation: rotate 3s linear infinite;
  /* background-color: #000; */
  background-image: conic-gradient(
      transparent 0,
      rgb(130, 117, 255),
      rgb(14, 151, 254),
      transparent 40%
    ),
    conic-gradient(
      transparent 50%,
      rgb(130, 117, 255),
      rgb(14, 151, 254),
      transparent 90%
    );
  background-repeat: no-repeat;
  background-position: 0 0;
}

@keyframes rotate {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>
