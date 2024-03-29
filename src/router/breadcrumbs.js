export default {
    root: {
      name: 'home',
      text: 'menu.home'
    },
    routes: [
        {
            name: 'home',
            text: 'menu.home'
        },
        {
            text: 'menu.announcement',
            disabled: true,
            children: [
                {
                    name: 'announcement',
                    text: 'menu.announcement',
                    children: [
                        {
                            name: 'announcementCreate',
                            text: 'menu.create'
                        },
                        {
                            name: 'announcementEdit',
                            text: 'menu.edit'
                        }
                    ]
                }
            ]
        },
        {
            text: 'menu.announcement',
            disabled: true,
            children: [
                {
                    name: 'announcement',
                    text: 'menu.announcement',
                    children: [
                        {
                            name: 'announcementCreate',
                            text: 'menu.create'
                        },
                        {
                            name: 'announcementEdit',
                            text: 'menu.edit'
                        }
                    ]
                }
            ]
        },
        {
            text: 'menu.qualificationQuestions',
            disabled: true,
            children: [
                {
                    name: 'qualificationQuestions',
                    text: 'menu.qualificationQuestions',
                    children: [
                        {
                            name: 'qualificationQuestionsCreate',
                            text: 'menu.create'
                        },
                        {
                            name: 'qualificationQuestionsEdit',
                            text: 'menu.edit'
                        }
                    ]
                }
            ]
        },
        {
            text: 'menu.studentLoanRequestRecord',
            disabled: true,
            children: [
                {
                    name: 'studentLoanRequestRecord',
                    text: 'menu.studentLoanRequestRecord',
                    children: [
                        {
                            name: 'studentLoanRequestRecordCreate',
                            text: 'menu.create'
                        },
                        {
                            name: 'studentLoanRequestRecordEdit',
                            text: 'menu.edit'
                        }
                    ]
                }
            ]
        },
        {
            text: 'menu.volunteerActivitiesHoursRecord',
            disabled: true,
            children: [
                {
                    name: 'volunteerActivitiesHoursRecord',
                    text: 'menu.volunteerActivitiesHoursRecord',
                    children: [
                        {
                            name: 'volunteerActivitiesHoursRecordCreate',
                            text: 'menu.create'
                        },
                        {
                            name: 'volunteerActivitiesHoursRecordEdit',
                            text: 'menu.edit'
                        }
                    ]
                }
            ]
        }
    ]
}
  