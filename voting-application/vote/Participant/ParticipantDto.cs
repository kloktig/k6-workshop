namespace vote.Participant
{
    public record ParticipantDto
    {
        public string Name { get; }
        
        public ParticipantDto(string name )
        {
            Name = name;
        }
    }
}