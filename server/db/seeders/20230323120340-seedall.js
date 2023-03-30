/** @type {import('sequelize-cli').Migration} */
const db = require('../models/index');

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await db.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 1;');
    await db.sequelize.query('ALTER SEQUENCE "Questions_id_seq" RESTART WITH 1;');
    await db.sequelize.query('ALTER SEQUENCE "Subjects_id_seq" RESTART WITH 1;');
    await db.sequelize.query('ALTER SEQUENCE "Tags_id_seq" RESTART WITH 1;');
    await db.sequelize.query('ALTER SEQUENCE "Ratings_id_seq" RESTART WITH 1;');

    const questions = [
      {

        userId: 1,
        title: ' How to use js in react program text',
        text: 'Dear Alexander, the condo is in Kathu area it’s call Dcondo Creek from Kamala about 20 minutes drive. You can check location but the room is occupied as I told you. I am currently not in Phuket. I will be back to Phuket in April and my assistant only at the condo when check in and check out. I can send you a google map that you can check.',
        price: 200,
        status: true,
        createdAt: '2023-03-22T15:33:38.493Z',
        updatedAt: '2023-03-22T15:33:38.493Z',
      },
      {

        userId: 1,
        title: ' How to add ffmpeg to React app?',
        text: 'Dear Kob, than you for your prompt response! Please send me google map, and i will find a way to come to your place today or tomorrow . best regards, Alexander',
        price: 123,
        status: true,
        createdAt: '2023-03-22T15:35:04.430Z',
        updatedAt: '2023-03-22T15:35:04.430Z',
      },
      {

        userId: 1,
        title: ' asdf',
        text: 'asd',
        price: 33,
        status: true,
        createdAt: '2023-03-23T02:53:23.525Z',
        updatedAt: '2023-03-23T02:53:23.525Z',
      },
      {

        userId: 1,
        title: ' How to map in react',
        text: 'Explain to me like im 5',
        price: 99,
        status: true,
        createdAt: '2023-03-23T05:57:47.341Z',
        updatedAt: '2023-03-23T05:57:47.341Z',
      },
      {

        userId: 1,
        title: ' How to compile',
        text: 'How to make it all work',
        price: 400,
        status: true,
        createdAt: '2023-03-23T05:59:41.675Z',
        updatedAt: '2023-03-23T05:59:41.675Z',
      },
      {

        userId: 1,
        title: ' Make these two work together',
        text: 'Styling guide needed',
        price: 300,
        status: true,
        createdAt: '2023-03-23T06:01:22.630Z',
        updatedAt: '2023-03-23T06:01:22.630Z',
      },
      {

        userId: 1,
        title: 'React-router URLs',
        text: 'Explain how they work',
        price: 435,
        status: true,
        createdAt: '2023-03-23T06:03:50.934Z',
        updatedAt: '2023-03-23T06:03:50.934Z',
      },
      {

        userId: 3,
        title: 'What is the difference between React Native and React?',
        text: 'I have started to learn React out of curiosity and wanted to know the difference between React and React Native - though could not find a satisfactory answer using Google. React and React Native seems to have the same format. Do they have completely different syntax?',
        price: 299,
        status: true,
        createdAt: '2023-03-23T06:13:29.240Z',
        updatedAt: '2023-03-23T06:13:29.240Z',
      },
      {

        userId: 3,
        title: ' how to do tag1 with tag2',
        text: 'Everybody is giving a dictionary response when most people asking this question just want to know how interchangeable they are: How easy is it to port their React code to React Native? Will you need to rewrite the front end of your web app into different React code if you want it on an iPad? How differe',
        price: 999,
        status: true,
        createdAt: '2023-03-23T06:15:55.089Z',
        updatedAt: '2023-03-23T06:15:55.089Z',
      },
      {

        userId: 2,
        title: ' How do they work in react pls. Quick guide',
        text: "'m using React-router and it works fine while I'm clicking on link buttons, but when I refresh my webpage it does not load what I want.",
        price: 199,
        status: false,
        createdAt: '2023-03-23T06:10:09.624Z',
        updatedAt: '2023-03-23T06:47:35.922Z',
      },
      {

        userId: 1,
        title: ' How to make them work',
        text: 'Our public platform serves 100 million people every month, making it one of the most popular websites in the world.',
        price: 234,
        status: true,
        createdAt: '2023-03-23T06:59:48.856Z',
        updatedAt: '2023-03-23T06:59:48.856Z',
      },
      {

        userId: 1,
        title: ' How do they work',
        text: 'Please help me to understand this subject',
        price: 100,
        status: false,
        createdAt: '2023-03-23T07:27:28.115Z',
        updatedAt: '2023-03-23T07:30:57.071Z',
      },
      {

        userId: 2,
        title: 'Server-side vs Client-side',
        text: "he first big thing to understand about this is that there are now 2 places where the URL is interpreted, whereas there used to be only 1 in 'the old days'. In the past, when life was simple, some user sent a request for http:\/\/example.com\/about to the server, which inspected the path part of the URL, determined the user was requesting the about page, and then sent back that page.",
        price: 355,
        status: true,
        createdAt: '2023-03-23T06:10:46.029Z',
        updatedAt: '2023-03-23T11:36:21.928Z',
      },
    ];
    const users = [
      {

        name: 'Vasya',
        surname: 'Masya',
        userpic: '',
        email: '3',
        password: '$2b$10$SwfTuxmMGpwKWNJa14j8z.xYynzQWCDI.ChOcZgJ338bkgNukYnWq',
        bio: '',
        cash: 5000,
        createdAt: '2023-03-23T06:10:59.890Z',
        updatedAt: '2023-03-23T10:35:53.990Z',
      },
      {

        name: 'Вася',
        surname: 'Синий',
        userpic: 'https://i.imgur.com/kHlhgCX.png',
        email: '2',
        password: '$2b$10$2welPujQn.Aa0xbH6FmHHewoN8s281EHmJJqe7oJ1UdA3O\/toin7q',
        bio: 'эксперт по стекломою и омывайкам(мою стекло и омываю, соответственно)',
        cash: 4500,
        createdAt: '2023-03-22T15:27:53.692Z',
        updatedAt: '2023-03-23T11:19:53.858Z',
      },
      {

        name: 'Alex',
        surname: 'Fetisov',
        userpic: 'https://i.imgur.com/KLxAXvE.png',
        email: '1',
        password: '$2b$10$nNcFkevUKf4rrEar49y17e7QSvA2VO/OkarlY4/yT.zd0EEy87oAW',
        bio: "hi I'm an expert in windows calculator!",
        cash: 66500,
        createdAt: '2023-03-22T15:27:39.832Z',
        updatedAt: '2023-03-23T11:19:53.862Z',
      },

      {
        name: null,
        surname: null,
        userpic: null,
        email: '4',
        password: '$2b$10$s4IhHsTBcrRXRwveReo7auKdzG8F2s3vFS5QDyAUa8STaSgJ3i.aS',
        bio: null,
        cash: null,
        createdAt: '2023-03-30T18:41:59.912Z',
        updatedAt: '2023-03-30T18:41:59.912Z',
      },
      {
        name: null,
        surname: null,
        userpic: null,
        email: 'user5',
        password: '$2b$10$4ZLCKoH6MfxdpCQbrsDXu.osH9zvShEl.r35vX1zt22pdDJHasAJO',
        bio: null,
        cash: null,
        createdAt: '2023-03-30T18:42:10.030Z',
        updatedAt: '2023-03-30T18:42:10.030Z',
      },
      {
        name: null,
        surname: null,
        userpic: null,
        email: 'user6',
        password: '$2b$10$bWxyJI4I5Bv.JG2eRWKgr.tAoCoKNjfMvHp3fDvMNlSrmIwiu6jJq',
        bio: null,
        cash: null,
        createdAt: '2023-03-30T18:42:17.410Z',
        updatedAt: '2023-03-30T18:42:17.410Z',
      },
      {
        name: null,
        surname: null,
        userpic: null,
        email: 'user7',
        password: '$2b$10$vX7VJxgpMxVhfmUljTcMie8//oU4zL1Cv2v8rL2USYQ4Cnf.Hg0e.',
        bio: null,
        cash: null,
        createdAt: '2023-03-30T18:42:23.868Z',
        updatedAt: '2023-03-30T18:42:23.868Z',
      },
      {
        name: null,
        surname: null,
        userpic: null,
        email: 'user8',
        password: '$2b$10$24xxDLb9Ae9x9CaiBF0mIOGmc7hgPkEqjCtcRI7Wl1Tuf85Fkf5ga',
        bio: null,
        cash: null,
        createdAt: '2023-03-30T18:43:12.612Z',
        updatedAt: '2023-03-30T18:43:12.612Z',
      },

    ];
    const subjects = [
      {
        title: 'react',
        createdAt: '2023-03-22T15:33:38.652Z',
        updatedAt: '2023-03-22T15:33:38.652Z',
      },
      {
        title: 'js',
        createdAt: '2023-03-22T15:33:38.668Z',
        updatedAt: '2023-03-22T15:33:38.668Z',
      },
      {
        title: 'ffmpeg',
        createdAt: '2023-03-22T15:35:04.489Z',
        updatedAt: '2023-03-22T15:35:04.489Z',
      },
      {
        title: 'arrays',
        createdAt: '2023-03-23T02:53:23.593Z',
        updatedAt: '2023-03-23T02:53:23.593Z',
      },
      {
        title: 'express',
        createdAt: '2023-03-23T05:59:41.740Z',
        updatedAt: '2023-03-23T05:59:41.740Z',
      },
      {
        title: 'sass',
        createdAt: '2023-03-23T06:01:22.690Z',
        updatedAt: '2023-03-23T06:01:22.690Z',
      },
      {
        title: 'router',
        createdAt: '2023-03-23T06:03:50.996Z',
        updatedAt: '2023-03-23T06:03:50.996Z',
      },
      {
        title: 'map',
        createdAt: '2023-03-23T06:10:09.685Z',
        updatedAt: '2023-03-23T06:10:09.685Z',
      },
      {
        title: 'filter',
        createdAt: '2023-03-23T06:10:09.694Z',
        updatedAt: '2023-03-23T06:10:09.694Z',
      },
      {
        title: 'server',
        createdAt: '2023-03-23T06:10:46.088Z',
        updatedAt: '2023-03-23T06:10:46.088Z',
      },
      {
        title: 'client',
        createdAt: '2023-03-23T06:10:46.096Z',
        updatedAt: '2023-03-23T06:10:46.096Z',
      },
      {
        title: 'react native',
        createdAt: '2023-03-23T06:13:29.302Z',
        updatedAt: '2023-03-23T06:13:29.302Z',
      },
      {
        title: 'tag1',
        createdAt: '2023-03-23T06:15:55.220Z',
        updatedAt: '2023-03-23T06:15:55.220Z',
      },
      {
        title: 'tag2',
        createdAt: '2023-03-23T06:15:55.234Z',
        updatedAt: '2023-03-23T06:15:55.234Z',
      },
    ];
    const tags = [
      {
        questionId: 1,
        subjectId: 1,
        createdAt: '2023-03-22T15:33:38.663Z',
        updatedAt: '2023-03-22T15:33:38.663Z',
      },
      {
        questionId: 1,
        subjectId: 2,
        createdAt: '2023-03-22T15:33:38.670Z',
        updatedAt: '2023-03-22T15:33:38.670Z',
      },
      {
        questionId: 2,
        subjectId: 1,
        createdAt: '2023-03-22T15:35:04.484Z',
        updatedAt: '2023-03-22T15:35:04.484Z',
      },
      {
        questionId: 2,
        subjectId: 3,
        createdAt: '2023-03-22T15:35:04.497Z',
        updatedAt: '2023-03-22T15:35:04.497Z',
      },
      {
        questionId: 3,
        subjectId: 2,
        createdAt: '2023-03-23T02:53:23.587Z',
        updatedAt: '2023-03-23T02:53:23.587Z',
      },
      {
        questionId: 3,
        subjectId: 4,
        createdAt: '2023-03-23T02:53:23.603Z',
        updatedAt: '2023-03-23T02:53:23.603Z',
      },
      {
        questionId: 4,
        subjectId: 1,
        createdAt: '2023-03-23T05:57:47.405Z',
        updatedAt: '2023-03-23T05:57:47.405Z',
      },
      {
        questionId: 4,
        subjectId: 2,
        createdAt: '2023-03-23T05:57:47.412Z',
        updatedAt: '2023-03-23T05:57:47.412Z',
      },
      {
        questionId: 4,
        subjectId: 4,
        createdAt: '2023-03-23T05:57:47.416Z',
        updatedAt: '2023-03-23T05:57:47.416Z',
      },
      {
        questionId: 5,
        subjectId: 3,
        createdAt: '2023-03-23T05:59:41.731Z',
        updatedAt: '2023-03-23T05:59:41.731Z',
      },
      {
        questionId: 5,
        subjectId: 1,
        createdAt: '2023-03-23T05:59:41.738Z',
        updatedAt: '2023-03-23T05:59:41.738Z',
      },
      {
        questionId: 5,
        subjectId: 5,
        createdAt: '2023-03-23T05:59:41.748Z',
        updatedAt: '2023-03-23T05:59:41.748Z',
      },
      {
        questionId: 6,
        subjectId: 2,
        createdAt: '2023-03-23T06:01:22.686Z',
        updatedAt: '2023-03-23T06:01:22.686Z',
      },
      {
        questionId: 6,
        subjectId: 6,
        createdAt: '2023-03-23T06:01:22.697Z',
        updatedAt: '2023-03-23T06:01:22.697Z',
      },
      {
        questionId: 6,
        subjectId: 1,
        createdAt: '2023-03-23T06:01:22.701Z',
        updatedAt: '2023-03-23T06:01:22.701Z',
      },
      {
        questionId: 7,
        subjectId: 1,
        createdAt: '2023-03-23T06:03:50.992Z',
        updatedAt: '2023-03-23T06:03:50.992Z',
      },
      {
        questionId: 7,
        subjectId: 7,
        createdAt: '2023-03-23T06:03:51.001Z',
        updatedAt: '2023-03-23T06:03:51.001Z',
      },
      {
        questionId: 8,
        subjectId: 1,
        createdAt: '2023-03-23T06:10:09.681Z',
        updatedAt: '2023-03-23T06:10:09.681Z',
      },
      {
        questionId: 8,
        subjectId: 8,
        createdAt: '2023-03-23T06:10:09.691Z',
        updatedAt: '2023-03-23T06:10:09.691Z',
      },
      {
        questionId: 8,
        subjectId: 9,
        createdAt: '2023-03-23T06:10:09.697Z',
        updatedAt: '2023-03-23T06:10:09.697Z',
      },
      {
        questionId: 9,
        subjectId: 1,
        createdAt: '2023-03-23T06:10:46.085Z',
        updatedAt: '2023-03-23T06:10:46.085Z',
      },
      {
        questionId: 9,
        subjectId: 10,
        createdAt: '2023-03-23T06:10:46.094Z',
        updatedAt: '2023-03-23T06:10:46.094Z',
      },
      {
        questionId: 9,
        subjectId: 11,
        createdAt: '2023-03-23T06:10:46.101Z',
        updatedAt: '2023-03-23T06:10:46.101Z',
      },
      {
        questionId: 10,
        subjectId: 1,
        createdAt: '2023-03-23T06:13:29.296Z',
        updatedAt: '2023-03-23T06:13:29.296Z',
      },
      {
        questionId: 10,
        subjectId: 12,
        createdAt: '2023-03-23T06:13:29.308Z',
        updatedAt: '2023-03-23T06:13:29.308Z',
      },
      {
        questionId: 11,
        subjectId: 13,
        createdAt: '2023-03-23T06:15:55.230Z',
        updatedAt: '2023-03-23T06:15:55.230Z',
      },
      {
        questionId: 11,
        subjectId: 14,
        createdAt: '2023-03-23T06:15:55.241Z',
        updatedAt: '2023-03-23T06:15:55.241Z',
      },
      {
        questionId: 12,
        subjectId: 1,
        createdAt: '2023-03-23T06:59:48.909Z',
        updatedAt: '2023-03-23T06:59:48.909Z',
      },
      {
        questionId: 12,
        subjectId: 2,
        createdAt: '2023-03-23T06:59:48.913Z',
        updatedAt: '2023-03-23T06:59:48.913Z',
      },
      {
        questionId: 12,
        subjectId: 4,
        createdAt: '2023-03-23T06:59:48.917Z',
        updatedAt: '2023-03-23T06:59:48.917Z',
      },
      {
        questionId: 13,
        subjectId: 1,
        createdAt: '2023-03-23T07:27:28.208Z',
        updatedAt: '2023-03-23T07:27:28.208Z',
      },
      {
        questionId: 13,
        subjectId: 3,
        createdAt: '2023-03-23T07:27:28.219Z',
        updatedAt: '2023-03-23T07:27:28.219Z',
      },
    ];

    const ratings = [
      {
        id: 3,
        expertId: 2,
        userId: 3,
        rating: 5,
        createdAt: '2023-03-23T14:29:48.691Z',
        updatedAt: '2023-03-23T14:31:01.443Z',
      },
      {
        id: 4,
        expertId: 1,
        userId: 3,
        rating: 3,
        createdAt: '2023-03-23T14:29:54.372Z',
        updatedAt: '2023-03-23T14:31:22.768Z',
      },
      {
        id: 5,
        expertId: 1,
        userId: 4,
        rating: 4,
        createdAt: '2023-03-24T09:41:18.190Z',
        updatedAt: '2023-03-24T10:54:41.591Z',
      },
      {
        id: 6,
        expertId: 3,
        userId: 4,
        rating: 5,
        createdAt: '2023-03-24T11:13:12.752Z',
        updatedAt: '2023-03-24T11:13:12.752Z',
      },
      {
        id: 7,
        expertId: 5,
        userId: 1,
        rating: 4,
        createdAt: '2023-03-24T11:25:09.839Z',
        updatedAt: '2023-03-24T11:25:09.839Z',
      },
      {
        id: 8,
        expertId: 4,
        userId: 1,
        rating: 5,
        createdAt: '2023-03-24T11:25:11.318Z',
        updatedAt: '2023-03-24T11:25:11.318Z',
      },
      {
        id: 9,
        expertId: 6,
        userId: 1,
        rating: 3,
        createdAt: '2023-03-24T11:27:55.729Z',
        updatedAt: '2023-03-24T11:27:55.729Z',
      },
      {
        id: 10,
        expertId: 7,
        userId: 1,
        rating: 5,
        createdAt: '2023-03-24T11:31:02.862Z',
        updatedAt: '2023-03-24T11:31:02.862Z',
      },
      {
        id: 11,
        expertId: 8,
        userId: 1,
        rating: 5,
        createdAt: '2023-03-24T11:34:06.826Z',
        updatedAt: '2023-03-24T11:34:06.826Z',
      },
    ];

    await queryInterface.bulkInsert('Users', users);
    await queryInterface.bulkInsert('Subjects', subjects);
    await queryInterface.bulkInsert('Questions', questions);
    await queryInterface.bulkInsert('Tags', tags);
    await queryInterface.bulkInsert('Ratings', ratings);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Subjects', null, {});
    await queryInterface.bulkDelete('Questions', null, {});
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Ratings', null, {});
  },
};
