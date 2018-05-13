/**
  * give a vote to candidate
  * @param {org.acme.empty.Vote} Vote - the Vote to be processed
  * @transaction
  */
 async function Vote(voteTransaction) {
    //var currentParticipant = getCurrentParticipant();
    // get vote
    var vote = voteTransaction.electionVote;
    var voter = vote.voter;
    let voterID = voter.passportID;
    
    /*let voterQualifiedIdentifier = 'org.acme.empty.Voter#'.concat(voterID);
    if (currentParticipant.getFullyQualifiedIdentifier() !== voterQualifiedIdentifier) {
             throw new Error('Transaction can only be submitted by voter'.concat(voterID));
    }*/
    
    // get candidate
    var candidate = vote.candidate;
    var poll = vote.poll;
    var voters = poll.voters;
    
    if(voters.indexOf(voter) > -1) {
      throw new Error('Already voted');
    }
    
    // if voter has not voted give a vote to candidate
    candidate.votes.push(vote);
    poll.voters.push(voter);
    // get asset 'org.acme.votenetwork.Candidate'
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
  
    /**
    * register new voter in the system
    * @param {org.acme.empty.RegisterVoter} registerVoterTx - user registration tx to be processed
    * @transaction
    */
  async function RegisterVoter(registerVoterTx) {
      let voterPassportID = registerVoterTx.passportID;
      let voterPassword = registerVoterTx.password;
    
      await getParticipantRegistry('org.acme.empty.Voter').then(function(voterRegistry) {
           return voterRegistry.exists(voterPassportID)
         }).then(function(exists) {
              if(!exists) {
                  var factory = getFactory();
                  var voter = factory.newResource('org.acme.empty', 'Voter', voterPassportID)
                  voter.password = voterPassword;
                  return getParticipantRegistry('org.acme.empty.Voter').then(function(registry) {
                      return registry.add(voter)
                  });
              } else {
                  throw Error('Voter is already registered')
              }
          }
      )
  }
  
    /**
     * create new poll in the system
     * @param {org.acme.empty.CreatePoll} createPollTx - create poll tx to be processed
     * @transaction
     */
    async function CreatePoll(createPollTx) {
        let pollCandidates = createPollTx.candidates;
  
        var factory = getFactory();
        var poll = factory.newResource('org.acme.empty', 'Poll', createPollTx.pollName)
        poll.pollName = createPollTx.pollName;
        poll.creationDate = Date.now();
        poll.startDate = createPollTx.startDate;
        poll.finishDate = createPollTx.finishDate;
        poll.candidates = pollCandidates;
        poll.voters = [];
        return getAssetRegistry('org.acme.empty.Poll').then(function(pollRegistry) {
            return pollRegistry.add(poll)
        });
    }