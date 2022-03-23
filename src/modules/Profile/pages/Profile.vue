<template>
  <div class="profile-page">
    <h2 class="profile-page__title">Профиль</h2>

    <div class="profile-page__wrapper">
      <ProfileEdit />
    </div>
  </div>
</template>

<script>
import ProfileEdit from "../components/ProfileEdit";

export default {
  name: "ProfilePage",
  components: { ProfileEdit },
};
</script>

<style lang="scss">
.profile-page {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__title {
    color: var(--v-primary-text-3-base);
    margin-bottom: 30px;
    margin-right: auto;
  }

  &__wrapper {
    width: 100%;
    max-width: 780px;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 20px;
  }
}
</style>
