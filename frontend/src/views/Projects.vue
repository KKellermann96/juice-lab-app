<script lang="ts" setup>
import { ref } from "vue";
import FancyButton from "../shared/FancyButton.vue";
import ProjectCard from "../components/project/ProjectCard.vue";
import ProjectDescription from "../components/project/ProjectDescription.vue";
import { projectItems } from "../components/project/projectItems";

defineProps({
  goBack: {
    type: Function,
    default: () => {},
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
});

const selectedProjectId = ref<number | undefined>(undefined);

const projectsContainer = ref<HTMLDivElement | null>(null);
defineExpose({ projectsContainer });
</script>

<template>
  <div
    ref="projectsContainer"
    class="relative h-screen w-screen flex justify-center items-center !select-text"
  >
    <div>
      <div class="w-[54.8rem] h-[72.8rem] flex flex-col items-center">
        <div
          class="relative w-full h-full bg-Mint-300 py-5 px-4 rounded-[50px]"
        >
          <Transition name="fade" mode="out-in">
            <div
              v-if="selectedProjectId !== undefined"
              class="flex justify-center"
            >
              <ProjectDescription
                :imgPath="projectItems[selectedProjectId].imgSrc"
                :title="projectItems[selectedProjectId].title"
                :description="projectItems[selectedProjectId].description"
              ></ProjectDescription>
            </div>
            <div
              v-else
              class="grid grid-cols-2 md:grid-cols-3 gap-5 h-[57rem] overflow-y-auto p-3 mb-3"
            >
              <div
                v-for="(item, i) in projectItems"
                :key="i"
                class="flex justify-center"
              >
                <ProjectCard
                  :title="item.title"
                  :imgPath="item.imgSrc"
                  :disable="item.imgSrc.startsWith('can')"
                  @onClick="selectedProjectId = i"
                ></ProjectCard>
              </div>
            </div>
          </Transition>
          <div
            class="absolute bottom-5 w-[51rem] flex justify-center sm:justify-between gap-x-2"
          >
            <FancyButton
              v-if="selectedProjectId != undefined"
              :action="
                () => {
                  selectedProjectId = undefined;
                }
              "
              icon="back"
            >
            </FancyButton>
            <div v-else></div>
            <FancyButton :action="goBack" icon="home"> </FancyButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
