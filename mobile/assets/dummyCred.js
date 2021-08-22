const dummyCreds = [
  {
    referent: 'Full Vaccination (UK)',
    attrs: {
      first_name: 'Dummy',
      last_name: 'Man',
      NINO: '01234567',
      status: 'full vaccination',
      vaccine: 'AstraZeneca',
      country: 'United Kingdom',
      date: '2021-04-01',
      thumbnail:
        'https://assets.nhs.uk/nhsuk-cms/images/Vaccinations.width-1200.png',
    },
    schema_id: 'full_vaccination',
    cred_def_id: 'vaccination_101',
    rev_reg_id: 'None',
    cred_rev_id: 'None',
  },
  {
    referent: 'Rapid Antigen Test (FR)',
    attrs: {
      first_name: 'Dummy',
      last_name: 'Man',
      passport: '12345678',
      status: 'negative',
      lab: 'Centre de test COVID de Paris',
      country: 'France',
      date: '2021-08-01',
      thumbnail:
        'https://www.city-junction.com/wp-content/uploads/2021/01/logo-tous-anti-covid.jpg',
    },
    schema_id: 'rat_test',
    cred_def_id: 'test_101',
    rev_reg_id: 'None',
    cred_rev_id: 'None',
  },
];

export default dummyCreds;
