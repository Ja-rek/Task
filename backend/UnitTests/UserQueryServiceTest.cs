using Application.Data;
using Application.Services;
using Application.Users;

namespace UnitTests
{
    public class UserQueryServiceTest
    {
        [Test]
        [TestCase("1985-01-20", 38)] 
        [TestCase("1985-01-22", 37)] 
        public async Task GetUsers_ReturnsUsers(DateTime dateOfBrith, int age)
        {
            //arrange 
            var stubUserDAOService = new Mock<IUserDAOService>();
            var fixture = new Fixture();

            var users = fixture.Build<User>()
                .With(x => x.DateOfBirth, dateOfBrith)
                .CreateMany(5);

            stubUserDAOService.Setup(m => m.GetUser()).ReturnsAsync(users);
            var userQueryFacade = UserQueryFacade(stubUserDAOService.Object);

            //act 
            var result = await userQueryFacade.GetUsers();
            var expected = users.Select(x => new UserResult
            {
                Age = age,
                FirstName = x.FirstName,
                LastName = x.LastName,
                ApartmentNumber = x.ApartmentNumber,
                StreetName = x.StreetName,
                DateOfBirth = dateOfBrith,
                HouseNumber = x.HouseNumber,
                PhoneNumber = x.PhoneNumber,
                PostalCode = x.PostalCode,
                Town = x.Town,
            });

            result.Should().BeEquivalentTo(expected);
        }

        public UserQueryService UserQueryFacade(IUserDAOService userDAOService)
        {
            var ageCounter = new AgeCounter(new DateTime(2023,01, 21));
            var factory = new UserResultsFactory(ageCounter);

            return new UserQueryService(userDAOService, factory);
        }
    }
}