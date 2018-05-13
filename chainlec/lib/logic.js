/**
  * give a vote to candidate
  * @param {org.acme.empty.Vote} Vote - the Vote to be processed
  * @transaction
  */
 async function Vote(voteTransaction) {
    var vote = voteTransaction.electionVote;

    var candidate = vote.candidate;
    var poll = vote.poll;
    var voter = vote.voter;

    var voters = poll.voters;
    
    if(voters.indexOf(voter) > -1) {
      throw new Error('Already voted');
    }

    // if voter has not voted give a vote to candidate and add voter to array of participants, who have already voted
    candidate.votes.push(vote);
    poll.voters.push(voter);

    return getAssetRegistry('org.acme.empty.Poll').then(function(pollRegistry) {
      getParticipantRegistry('org.acme.empty.Candidate').then(function(candidateRegistry) {
        return candidateRegistry.update(candidate);
      }).catch(function(error) {
        // Add optional error handling here.
      });
      // update the candidate registry
      return pollRegistry.update(poll);
    });
  }