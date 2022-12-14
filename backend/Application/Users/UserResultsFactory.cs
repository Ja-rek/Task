using Application.Data;
using Application.Services;

namespace Application.Users
{
    sealed public class UserResultsFactory
    {
        private readonly AgeCounter ageCounter;

        public UserResultsFactory(AgeCounter ageCounter)
        {
            this.ageCounter = ageCounter;
        }

        public IEnumerable<UserResult> UsersResult(IEnumerable<User> users)
        {
            return users.Select(x => new UserResult
            {
                Id = x.Id,
                ApartmentNumber = x.ApartmentNumber,
                DateOfBirth = x.DateOfBirth,
                FirstName = x.FirstName,
                HouseNumber = x.HouseNumber,
                LastName = x.LastName,
                PhoneNumber = x.PhoneNumber,
                PostalCode = x.PostalCode,
                StreetName = x.StreetName,
                Town = x.Town,
                Age = this.ageCounter.CountAge(x.DateOfBirth)
            });
        }
    }
}
