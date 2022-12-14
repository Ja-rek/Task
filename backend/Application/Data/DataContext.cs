﻿using Microsoft.EntityFrameworkCore;

namespace Application.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
    }

}
