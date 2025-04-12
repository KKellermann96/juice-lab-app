<script lang="ts" setup>
import { onMounted, ref } from "vue";
import FancyButton from "../shared/FancyButton.vue";
import { Vector3 } from "three";
import { ModelObject } from "../models";

const props = defineProps({
  goBack: {
    type: Function,
    default: () => {},
  },
  showOrHideMenu: {
    type: Function,
    default: () => {},
  },
  menuCardObject: {
    type: ModelObject,
    default: new ModelObject(),
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const isTransitioning = ref(false);
const showMenuText = ref(false);

const handleWheel = async (event) => {
  if (!isTransitioning.value) {
    isTransitioning.value = true;
    if (event.deltaY > 0) {
      // Scrolling down
      showMenuText.value = false;
      await props.showOrHideMenu(props.menuCardObject, "power2.in");
    } else {
      // Scrolling up
      await props.showOrHideMenu(newMenuCardPosition, "power2.out");
      showMenuText.value = true;
    }
    isTransitioning.value = false;
  }
};

onMounted(() => {
  if (props.isMobile) {
    window.addEventListener("pointerdown", handleWheel);
  } else {
    window.addEventListener("wheel", handleWheel);
  }
});

const reset = () => {
  props.goBack();
  if (props.isMobile) {
    window.removeEventListener("pointerdown", handleWheel);
  } else {
    window.removeEventListener("wheel", handleWheel);
  }
  props.showOrHideMenu(props.menuCardObject, "power2.in");
};

const newMenuCardPosition: ModelObject = new ModelObject(
  props.menuCardObject.object,
  new Vector3(7.15, 5.7, -2.81),
  new Vector3(0, 0.4, Math.PI / -2)
);

const aboutMeContainer = ref<HTMLDivElement | null>(null);

defineExpose({ aboutMeContainer });
</script>

<template>
  <div
    ref="aboutMeContainer"
    class="relative h-screen w-screen flex justify-center items-center !select-text"
  >
    <!-- Default View -->
    <Transition name="fade">
      <div
        v-if="!showMenuText"
        class="absolute inset-0 flex items-center justify-center"
      >
        <div class="flex justify-center items-center">
          <span class="font-semi-bold text-white text-[1.4rem]">{{
            !isMobile ? "- Scroll up" : "- Tab to bring up the menu -"
          }}</span>
          <img
            v-if="!isMobile"
            src="/icons/scrollUpIcon.png"
            alt="scrollDown"
            class="h-[2.6rem]"
          />
          <span
            v-if="!isMobile"
            class="font-semi-bold text-white text-[1.4rem]"
          >
            to bring up the menu -</span
          >
        </div>
      </div>
      <!-- MenuCard View -->
      <div v-else>
        <div
          class="w-[50rem] h-[57rem] mt-[6rem] mb-1 py-4 px-5 flex flex-col items-center font-georgia"
        >
          <h1 class="text-turquoise-100 text-[2.3rem] font-semi-bold mb-4">
            About me
          </h1>
          <div class="flex flex-col gap-5 items-center text-center">
            <div>
              <h2 class="font-semi-bold text-[1.3rem] mb-2">
                Appetizer (Introduction)
              </h2>
              <p class="mb-2">
                My name is Kristian, and I am a passionate Full Stack Developer
                with a strong background in software development. I hold a
                degree in Business Informatics, which has given me a strong
                foundation in both technology and business processes. I have
                gained hands-on experience across various industries, including
                1.5 years at the Fraunhofer Institute and over six months at the
                AI Lab Bremerhaven, focusing on robotics and app development.
                Since October 2022, I have been working at Infineon,
                contributing to innovative software solutions.
              </p>
              <p>
                Programming is more than just a profession for me — it's a
                passion. In my free time, I work on personal projects involving
                game development, 3D modeling, and interactive applications,
                exploring tools like Unity, Blender, C#, and ThreeJS.
              </p>
            </div>
            <div>
              <h2 class="font-semi-bold text-[1.3rem] mb-2">
                Main Course (Skills & Experience)
              </h2>
              <div class="flex flex-col gap-2 items-baseline">
                <li>
                  Full-stack development with strong proficiency in both
                  frontend and backend
                </li>
                <li>
                  Extensive knowledge of C#, JavaScript, TypeScript, and Python
                </li>
                <li>Experience in developing web and mobile applications</li>
              </div>
            </div>
            <div>
              <h2 class="font-semi-bold text-[1.3rem] mb-2">
                Dessert (Hobbies & Interests)
              </h2>
              <div>
                <div class="flex flex-col gap-2 items-baseline">
                  <li>
                    🕹️ <span class="font-semi-bold">Gaming -</span> Love playing
                    and developing games
                  </li>
                  <li>
                    🤸 <span class="font-semi-bold">Sport -</span> Tricking,
                    Freerunning and inline skating
                  </li>
                  <li>
                    📖
                    <span class="font-semi-bold">Reading -</span>
                    Tech blogs and sci-fi books are my favorite
                  </li>
                </div>
              </div>
            </div>
            <div>
              <h2 class="font-semi-bold text-[1.3rem] mb-2">
                Contact & Socials
              </h2>
              <div class="flex flex-col gap-2 items-baseline">
                <li>
                  📩
                  <span class="font-semi-bold">Email: </span>
                  kristian.kellermann@outlook.com
                </li>
                <li>
                  🔗
                  <span class="font-semi-bold">GitHub: </span>
                  <a
                    class="underline text-blue-500"
                    href="https://github.com/KKellermann96"
                    target="_blank"
                    >https://github.com/KKellermann96</a
                  >
                </li>
                <li>
                  💼
                  <span class="font-semi-bold">LinkedIn: </span>
                  <a
                    class="underline text-blue-500"
                    href="https://www.linkedin.com/in/kristian-kellermann-50938327a"
                    target="_blank"
                    >https://de.linkedin.com/in/kristian-kellermann</a
                  >
                </li>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isMobile" class="flex justify-center items-center">
          <span class="font-semi-bold text-[1.4rem]">- Scroll down</span>
          <img
            src="/icons/scrollDownIcon.png"
            alt="scrollDown"
            class="h-[2.5rem]"
          />
          <span class="font-semi-bold text-[1.4rem]">to close the menu -</span>
        </div>
      </div>
    </Transition>

    <FancyButton
      class="absolute sm:translate-x-[580px] translate-y-[580px]"
      :action="reset"
      icon="home"
    >
    </FancyButton>
  </div>
</template>
