<template>
	<v-container grid-list-md text-xs-center>
		<v-layout column>
			<v-flex xs1 offset-xs11>
				<v-btn color="info" @click="logOut">Logout</v-btn>
			</v-flex>
			<v-flex xs12>
				<v-card tile color="tile" class="pa-4">
					<h1 text-xs-center>Welcome {{user.displayName}}</h1>
					<v-form v-model="valid" ref="form" lazy-validation>
						<v-text-field
								label="Classroom Name"
								v-model="classroomName"
								:rules="classroomNameRules"
								:counter="20"
								required
						></v-text-field>
						<v-btn class="info"
							   @click="submit"
							   :disabled="!valid"
						>
							create a classroom
						</v-btn>
					</v-form>
				</v-card>
			</v-flex>
		</v-layout>

		<h3 class="pa-4">My Classrooms</h3>

		<v-card color="tile">
			<v-layout row wrap color="tile">
				<v-flex xs4
						v-for="item in classrooms"
						:key="item.id"
				>
					<v-card flat tile>

						<h3>
							<router-link :to="{
								name: 'ClassroomHome',
								params: { id: item.id }
							 }">
								{{item.ClassName}}
							</router-link>
						</h3>

					</v-card>
				</v-flex>
			</v-layout>
		</v-card>
	</v-container>
</template>

<script>
  import firebase from 'firebase';
	import {mapGetters} from 'vuex';

	export default {
		computed: {
			...mapGetters({
				user: 'getUser',
				classrooms: 'getClassrooms'
			}),
		},
		data: () => ({
			valid: true,
			// userId: '',
			// name: '',
			// email: '',
			//user: {},
			item: {},
			// classrooms: {},
			classroomName: '',
			classroomNameRules: [
				v => !!v || 'Classroom name is required',
				v => v.length <= 20 || 'Name must be fewer than 20 characters',
			],
		}),
		created() {
			this.getClassrooms();
		}
		,
		methods: {
			logOut() {
				firebase
					.auth()
					.signOut()
					.then(() => {
						this.$router.replace('Auth');
					});
			}
			,
			getClassrooms: function () {
				this.$store.dispatch('getClassrooms');
			}
			,
			submit() {
				this.$store.dispatch('createClassroom', {
					ClassName: this.classroomName,
				}).then(() => {
					// clear the form
					this.classroomName = '';
				});
				// let classroom = db.ref('Classrooms/' + this.userId);
				// if (this.$refs.form.validate()) {
				//	 classroom.push({
				//		 ClassName: this.classroomName,
				//	 });
				// }
			}
			,
		}
		,
	}
	;
</script>