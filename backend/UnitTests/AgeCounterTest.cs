using Application.Users;

namespace UnitTests
{
    public class AgeCounterTest
    {
        [Test]
        [TestCase("1985-01-20", 38)] 
        [TestCase("1985-01-22", 37)] 
        public void CountAge_AgeIsCorrect(DateTime birthDay, int age)
        {
            var result = new AgeCounter(new DateTime(2023,01, 21)).CountAge(birthDay);

            result.Should().Be(age);
        }
    }
}