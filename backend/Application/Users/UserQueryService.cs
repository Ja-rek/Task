using Application.Services;

namespace Application.Users
{
    public class UserQueryService
    {
        private readonly IUserDAOService userDAOService;
        private readonly UserResultsFactory userResultsFactory;

        public UserQueryService(IUserDAOService userDAOService, UserResultsFactory userResultsFactory)
        {
            this.userDAOService = userDAOService;
            this.userResultsFactory = userResultsFactory;
        }

        public async Task<IEnumerable<UserResult>> GetUsers()
        {
            var users = await this.userDAOService.GetUser();
            var usersResult = this.userResultsFactory.UsersResult(users);

            return usersResult;
        }
    }
}
