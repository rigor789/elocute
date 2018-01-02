<template>
   <v-card color="tile" tile class="pa-4">
    <h1 v-for="(item, key) in myclass"
              :key="key">Add Students to: {{ item['.value'] }}</h1>
  </v-card>
</template>

<script>
import firebase from 'firebase';

export default {
	data: () => ({
		userId: '',
		user: {},
		item: {},
	}),
	created() {
		/*this.user = firebase.auth().currentUser;
		this.userId = this.user.uid;

		if (this.user) {
			this.$bindAsArray('myclass', db.ref('Classrooms/' + this.userId + '/' + this.$route.params.id));
		}*/
	},
	methods: {
		/*submit() {
			let classroom = db.ref('Classrooms/' + this.userId);
			if (this.$refs.form.validate()) {
				classroom.push({
					ClassName: this.classroomName,
				});
      }
		},*/
	},
};
</script>

