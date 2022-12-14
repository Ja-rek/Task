using Application.Data;

namespace Application.Users
{
    public interface IUserDAOService
    {
        Task<IEnumerable<User>> GetUser();
    }
}
