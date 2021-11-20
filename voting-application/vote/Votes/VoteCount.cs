namespace vote.Votes
{
    public record VoteCount
    {
        public VoteCount(string name, int count, decimal percentage)
        {
            Name = name;
            Count = count;
            Percentage = percentage;
        }

        public string Name { get; }
        public int Count { get; }
        public decimal Percentage { get; }

    }
}