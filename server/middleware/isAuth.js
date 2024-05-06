module.exports = async (req, res, next) => {
	try {
	  // Check for sessionId cookie
	  const sessionId = req.cookies['sessionId'];
	  if (!sessionId) {
		return res.status(401).json({ message: 'Unauthorized: Missing session ID' });
	  }
	  
	  // Retrieve session data from store
	  await req.sessionStore.get(sessionId, (err, session) => {
		if (!session) {
			return res.status(401).json({ message: 'Unauthorized: Session not found on server' });
		}
		if (err) {
		  console.error(err);
		  return res.status(500).json({ message: 'Internal server error' });
		}
		
  
		// Assuming your session ID is stored in a property named 'id' (adjust if different)
		const retrievedSessionId = session.user;

  
		// Check if session exists, is valid, and has a user ID
		if (!session || !retrievedSessionId || !session.user) {
		  return res.status(401).json({ message: 'Unauthorized: Invalid session' });
		}
  
		// Session is valid, attach user ID to request object
		req.user = session.user;
		next();
	  });
	} catch (error) {
	  console.error(error);
	  return res.status(500).json({ message: 'Internal server error' });
	}
  };
  