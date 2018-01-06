<template>
   <v-card color="tile" tile class="pa-4">
    <h1>{{assignment.Title}}</h1> 
    <p align="left">{{assignment.Text}}</p>  
  </v-card>
</template>

<script>
import firebase from 'firebase';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters({
			user: 'getUser',
			assignment: 'getAssignment',
		}),
	},
	created() {
		this.getAssignment();
	},
	methods: {
		getAssignment() {
			let assignmentId = this.$route.params.id;
			this.$store.dispatch('getAssignment', {
				id: assignmentId,
			});
		},
	},
};
</script>

