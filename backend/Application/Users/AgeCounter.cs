namespace Application.Users
{
    sealed public class AgeCounter
    {
        private readonly DateTime today;

        public AgeCounter(DateTime today)
        {
            this.today = today;
        }

        public int CountAge(DateTime dateOfBirth)
        {
            var a = (this.today.Year * 100 + this.today.Month) * 100 + this.today.Day;
            var b = (dateOfBirth.Year * 100 + dateOfBirth.Month) * 100 + dateOfBirth.Day;

            return (a - b) / 10000;
        }
    }
}
