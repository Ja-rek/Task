using Application.Data;
using Application.Users;
using Microsoft.EntityFrameworkCore;

namespace Application.Services
{
    sealed public class UserDAOService : IUserDAOService
    {
        private readonly DataContext dataContext;

        public UserDAOService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task AddUser(UserComand userComand)
        {
            dataContext.Users.Add(userComand);
            await dataContext.SaveChangesAsync();
        }

        public async Task EditUser(UserComand userComand)
        {
            dataContext.Users.Update(userComand);
            await dataContext.SaveChangesAsync();
        }

        public async Task DeleteUser(int id)
        {
            dataContext.Users.Remove(new User { Id = id });
            await dataContext.SaveChangesAsync();
        }

        public async Task<IEnumerable<User>> GetUser()
        {
            return await dataContext.Users.ToListAsync();
        }
    }
}
