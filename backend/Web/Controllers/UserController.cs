using Application.Services;
using Application.Users;
using AutoFixture;
using Microsoft.AspNetCore.Mvc;

namespace Web.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private readonly UserDAOService userDAOService;
        private readonly UserQueryService userQueryFacade;

        public UserController(ILogger<UserController> logger, UserDAOService userDAOService, UserQueryService userQueryFacade)
        {
            _logger = logger;
            this.userDAOService = userDAOService;
            this.userQueryFacade = userQueryFacade;
        }

        public async Task<IEnumerable<UserResult>> Get()
        {
            var fixture = new Fixture();
            var usersStub = fixture.CreateMany<UserResult>(25);

            var ss = await this.userQueryFacade.GetUsers();
            //return await Task.FromResult(usersStub);
            return ss;
        }

        [HttpPost]
        public async Task Add(UserComand userComand)
        {
            userComand.Id = 0;
            await this.userDAOService.AddUser(userComand);
        }

        [Route("{id:int}")]
        public async Task Edit(int id, UserComand userComand)
        {
            userComand.Id = id;
            await this.userDAOService.EditUser(userComand);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public async Task Delete(int id)
        {
            await this.userDAOService.DeleteUser(id);
        }
    }
}