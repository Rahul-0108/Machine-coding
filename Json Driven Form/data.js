const DATA = {
  form: {
    id: 'multi-step-registration',
    title: 'User Registration',
    steps: [
      {
        id: 'personal-details',
        title: 'Personal Details',
        isFirst: true,
        fields: [
          {
            id: 'first-name',
            type: 'text',
            label: 'First Name',
            placeholder: 'Enter your first name',
            required: true,
            validation: {
              pattern: '^[A-Za-z]{2,}$',
              message:
                'First name must contain at least 2 letters and no numbers or special characters',
            },
          },
          {
            id: 'last-name',
            type: 'text',
            label: 'Last Name',
            placeholder: 'Enter your last name',
            required: true,
            validation: {
              pattern: '^[A-Za-z]{2,}$',
              message:
                'Last name must contain at least 2 letters and no numbers or special characters',
            },
          },
        ],
        navigation: {
          previous: {
            enabled: false,
            label: 'Previous',
          },
          next: {
            enabled: true,
            label: 'Next',
          },
        },
      },
      {
        id: 'interests',
        title: 'Interests',
        fields: [
          {
            id: 'favourite-movie',
            type: 'text',
            label: 'Favourite Movie',
            placeholder: 'Enter your favourite movie',
            required: true,
            validation: {
              minLength: 2,
              message:
                'Please enter a valid movie name (at least 2 characters)',
            },
          },
          {
            id: 'favourite-book',
            type: 'text',
            label: 'Favourite Book',
            placeholder: 'Enter your favourite book',
            required: true,
            validation: {
              minLength: 2,
              message: 'Please enter a valid book name (at least 2 characters)',
            },
          },
          {
            id: 'favourite-game',
            type: 'text',
            label: 'Favourite Game',
            placeholder: 'Enter your favourite game',
            required: true,
            validation: {
              minLength: 2,
              message: 'Please enter a valid game name (at least 2 characters)',
            },
          },
          {
            id: 'favourite-activity',
            type: 'text',
            label: 'Favourite Activity',
            placeholder: 'Enter your favourite activity',
            required: true,
            validation: {
              minLength: 2,
              message: 'Please enter a valid activity (at least 2 characters)',
            },
          },
        ],
        navigation: {
          previous: {
            enabled: true,
            label: 'Previous',
          },
          next: {
            enabled: true,
            label: 'Next',
          },
        },
      },
      {
        id: 'account',
        title: 'Account',
        isLast: true,
        fields: [
          {
            id: 'email',
            type: 'email',
            label: 'Email',
            placeholder: 'Enter your email address',
            required: true,
            validation: {
              pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
              message: 'Please enter a valid email address',
            },
          },
          {
            id: 'password',
            type: 'password',
            label: 'Password',
            placeholder: 'Create a password',
            required: true,
            validation: {
              pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$',
              message:
                'Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number',
            },
          },
        ],
        navigation: {
          previous: {
            enabled: true,
            label: 'Previous',
          },
          next: {
            enabled: true,
            label: 'Submit',
            isSubmit: true,
          },
        },
      },
    ],
  },
};

export default DATA;